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
  var host = new URL(referer).hostname;
  host = host.substring(0, host.indexOf('.'));
  // The challenge will be used when we return to the Hydra login flow
  var challenge = query.challenge;
  // The flow is used to fetch information about the login flow from ORY Kratos.
  var flow = query.flow;
  // The csrf_token is needed to fetch the login context
  var csrf = query.csrf_token;
 
  kratos.getLoginRequest(flow, csrf)
    // This will be called if the HTTP request was successful
    .then(function (response) {
      // Response is a JSON object, and whe are interested in the csrf_token field
      var nodes = response.ui.nodes;
      var t;
      
      nodes.forEach(element => {
        if (element.group == 'default') {
          // Get attributes
          if (element.attributes.name == 'csrf_token') {
            t = element.attributes.value;
          }
        }
      });
      
      res.render('login', {
        host: host,
        referer: referer,
        csrfToken: t,
        _csrf: req.csrfToken(),
        csrfCookie: csrf,
        flow: flow,
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
  var host = new URL(referer).hostname;
  host = host.substring(0, host.indexOf('.'));
  // The challenge is now a hidden input field, so let's take it from the request body instead
  var challenge = req.body.challenge
  // The flow is now a hidden input field, so let's take it from the request body instead
  var flow = req.body.flow;
  // Get the original csrf_token retrieved in the call to initiate the login
  var csrf = req.body.csrf_cookie;
  // Get the nodejs csrf token
  var _csrf = req.body._csrf;
  // Get the remember me
  var remember = req.body.remember;
  // Get csrf_token
  var csrf_token = req.body.csrf_token;
  // Get the identifier, as lowercase to avoid any case issues
  var identifier = req.body.identifier.toLowerCase();
  
  // Create a form body and append the fields we want to submit to Kratos
  var params = new URLSearchParams();
  params.append('method', 'password');
  params.append('password_identifier', identifier);
  params.append('password', req.body.password);
  params.append('csrf_token', csrf_token);
  
  kratos.acceptLoginRequest(flow, csrf, params)
    .then(function (response) {
      
      // If the login was successful, we should have a Kratos session cookie
      // This will be needed to access self-service flow and to perform a logout...
      var combinedCookieHeader = response.headers.get('set-cookie');
      
      if (combinedCookieHeader == null) {
        var error = new Error();
        // Add an error message as body
        error.body = new Promise((resolve, reject) => {
          resolve('Invalid username and/or password');
        });
        
        // Throw error
        throw error;
      }
      
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
      
      //var host = new URL(referer).hostname;
      //var host = 'avanet.avamonitoring.dev'; // If running locally with a known user, set the host to a value mathing the user
      //var idx = host.indexOf('.');
      
      var orgId = '';       // Organisation id
      var parentOrgId = ''; // Parent organisation id
      var orgUnitId = '';   // Organisational unit id
      var identityId = '';  // Identity id
      
      //avanet.getSessionAttributes(host.substring(0, idx), req.body.identifier, {
      avanet.getSessionAttributes(host, identifier, {
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
            subject: identifier,

            // This tells hydra to remember the browser and automatically authenticate the user in future requests. This will
            // set the "skip" parameter in the other route to true on subsequent requests!
            remember: Boolean(req.body.remember),

            // When the session expires, in seconds. Set this to 0 so it will never expire.
            remember_for: 0,
            
            // Making some session context available
            context: {
              ref: referer,       // Where the login originated from
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
            // Re-direct back to Hydra
            res.redirect(response.redirect_to);
          })
          // This will handle any error that happens when making HTTP calls to hydra
          .catch(function (error) {
            error.body.then(function(val) {
              if (error.status == 409) { // User hit the Back button
                res.redirect(referer);   // Re-start the login flow
              } 
              else {
                console.log(error)
                next(error);
              }
            });
          });
        })
        // This will handle any error that happens when making HTTP calls to avanet company-user-mgmt microservice
        .catch(function (error) {
          error.body.then(function(json) {
            var message;
        

            if (error.status == 400) {
              message = ['User is not allowed to log in at ' + referer + '. ', 'Please log in using the correct address.'];
            }
            else if (error.status == 401) {
              message = [json.errorDescription, json.traceId, json.spanId, 'Please contact AvaNet support at support@avamonitoring.com.'];
            }
            else {
              message = ['Unexpected status: ' + error.status,  json.errorDescription, json.traceId, json.spanId, 'Please contact AvaNet support at support@avamonitoring.com.'];
            }
      
            // Render login screen
            res.render('login', {
              error: true,
              error_message: message,
              host: host,
              referer: referer,
              csrfToken: csrf_token,
              _csrf: req.csrfToken(),
              csrfCookie: csrf,
              flow: flow,
              challenge: challenge
            });
          });
        });
    })
    // This will handle any error that happens when making HTTP calls to Kratos
    .catch(function (error) {

      error.body.then(function(val) {
        var message;
        
        if (typeof val == 'object') {
          message = [val.error.message];
        }
        else {
          message = [val];
        }
      
        // Render login screen
        res.render('login', {
          error: true,
          error_message: message,
          host: host,
          referer: referer,
          csrfToken: csrf_token,
          _csrf: req.csrfToken(),
          csrfCookie: csrf,
          flow: flow,
          challenge: challenge
        });
      });
    });
});

module.exports = router;
