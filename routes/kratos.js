var express = require('express');
var router = express.Router();
var url = require('url');
var setCookieParser = require('set-cookie-parser');
var hydra = require('../services/hydra');
var kratos = require('../services/kratos');
var avanet = require('../services/avanet');

// Sets up csrf protection
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var app = express();

const { URLSearchParams } = require('url');

router.get('/', csrfProtection, function (req, res, next) {
  // Parses the URL query
  var query = url.parse(req.url, true).query;
  // Get the host parameter that will tell us where the login request originated from
  var referer = query.referer;
  // The challenge will be used when we return to the Hydra login flow
  var challenge = query.challenge;
  // The request is used to fetch information about the login request from ORY Kratos.
  var request = query.request;
  // The csrf_token is needed to fetch the login context
  var csrf = query.csrf_token;
 
  kratos.getLoginRequest(request, csrf)
    // This will be called if the HTTP request was successful
    .then(function (response) {
      // Response is a JSON object, and whe are interested in the csrf_token field
      var fields = response.methods.password.config.fields;
      var t;
      
      for (i in fields) { 
        if (fields[i].name == 'csrf_token') {
          t = fields[i].value;
        }
      }
      
      res.render('login', {
        referer: referer,
        csrfToken: t,
        _csrf: req.csrfToken(),
        csrfCookie: csrf,
        request: request,
        challenge: challenge
      });
    })
    // This will handle any error that happens when making HTTP calls to kratos
    .catch(function (error) {
      console.log(error);
      next(error);
    });
});

router.post('/', csrfProtection, function (req, res, next) {
  // The referer parameter is now a hidden input field, so let's take it from the request body instead
  var referer = req.body.referer;
  // The challenge is now a hidden input field, so let's take it from the request body instead
  var challenge = req.body.challenge
  // The request is now a hidden input field, so let's take it from the request body instead
  var request = req.body.request;
  // Get the original csrf_token retrieved in the call to initiate the login
  var csrf = req.body.csrf_cookie;
  // Get the original csrf_token retrieved in the call to initiate the login
  var _csrf = req.body._csrf;
  // Get the remember me
  var remember = req.body.remember;
  
  // Create a form body and append the fields we want to submit to Kratos
  var params = new URLSearchParams();
  params.append('identifier', req.body.identifier);
  params.append('password', req.body.password);
  params.append('csrf_token', req.body.csrf_token);
  
  kratos.acceptLoginRequest(request, csrf, params)
    .then(function (response) {
      
      // If the login was successful, we should have a Kratos session cookie
      // This will be needed to access self-service flow and to perform a logout...
      var combinedCookieHeader = response.headers.get('set-cookie');
      var splitCookieHeaders = setCookieParser.splitCookiesString(combinedCookieHeader)
      
      var cookies = setCookieParser.parse(splitCookieHeaders, {
        decodeValues: true,  // default: true
        map: true            // default: false
      });
      
      var sessionCookie = cookies['ory_kratos_session'].value;
      
      // Let's see if the user decided to accept or reject the consent request..
      if (req.body.submit === 'Deny access') {
        // Looks like the login request was denied by the user
        return hydra.rejectLoginRequest(challenge, {
          error: 'access_denied',
          error_description: 'The resource owner denied the request'
        })
          .then(function (response) {
            // All we need to do now is to redirect the browser back to hydra!
            res.redirect(response.redirect_to);
          })
          // This will handle any error that happens when making HTTP calls to hydra
          .catch(function (error) {
            next(error);
          });
      }
      
      var host = new URL(referer).hostname;
      var idx = host.indexOf('.');
      
      var orgId = '';       // Organisation id
      var parentOrgId = ''; // Parent organisation id
      var orgUnitId = '';   // Organisational unit id
      var identityId = '';  // Identity id
      
      avanet.getSessionAttributes(host.substring(0, idx), req.body.identifier, {
        })
        // This will be called if the HTTP request was successful
        .then(function (response) {
                    
          if (typeof response == 'object') { // JSON response
            orgId = response.organisationId;
            parentOrgId = response.parentOrganisationId;
            orgUnitId = response.organisationalUnitId;
            identityId = response.identityId;
          }
          
          // Seems like the user authenticated! Let's tell hydra...
          hydra.acceptLoginRequest(challenge, {
            // Subject is an alias for user ID. A subject can be a random string, a UUID, an email address, ....
            subject: req.body.identifier,

            // This tells hydra to remember the browser and automatically authenticate the user in future requests. This will
            // set the "skip" parameter in the other route to true on subsequent requests!
            remember: Boolean(req.body.remember),

            // When the session expires, in seconds. Set this to 0 so it will never expire.
            remember_for: 3600,
            
            // Making some session context available
            context: {
              ksc: sessionCookie, // Kratos session cookie
              oid: orgId,         // Organisation id
              pid: parentOrgId,   // Parent organisation id
              oui: orgUnitId,     // Orgnisational unit id
              iid: identityId     // Identity id
            },

            // Sets which "level" (e.g. 2-factor authentication) of authentication the user has. The value is really arbitrary
            // and optional. In the context of OpenID Connect, a value of 0 indicates the lowest authorization level.
            acr: '0',
          })
          .then(function (response) {
            // All we need to do now is to redirect the user back to hydra!
            res.redirect(response.redirect_to);
          })
          // This will handle any error that happens when making HTTP calls to hydra
          .catch(function (error) {
             next(error);
          });
        })
        // This will handle any error that happens when making HTTP calls to avanet company-user-mgmt microservice
        .catch(function (error) {
          //error.body.then(function(val) {
            var message;
        
            //if (typeof val == 'object') {
              //message = val.error.message;
            //}
            //else {
              //message = val;
            //}
            if (error.status == 400) {
              message = 'User is not allowed to log in at ' + referer + '.';
            }
            else if (error.status == 401) {
              message = 'Problem retrieving session information. Please contact AvaNet support.';
            }
            else {
              message = 'Unexpected status code: ' + error.status + '. Please contact AvaNet support.';
            }
      
            // Render login screen
            res.render('login', {
              error: true,
              error_message: message,
              referer: referer,
              csrfToken: req.body.csrf_token,
              _csrf: req.csrfToken(),
              csrfCookie: req.body.csrf_cookie,
              request: request,
              challenge: challenge
            });
          //});
        });
    })
    // This will handle any error that happens when making HTTP calls to Kratos
    .catch(function (error) {
      error.body.then(function(val) {
        var message;
        
        if (typeof val == 'object') {
          message = val.error.message;
        }
        else {
          message = val;
        }
      
        // Render login screen
        res.render('login', {
          error: true,
          error_message: message,
          referer: referer,
          csrfToken: req.body.csrf_token,
          _csrf: req.csrfToken(),
          csrfCookie: req.body.csrf_cookie,
          request: request,
          challenge: challenge
        });
      });
    });
});

module.exports = router;
