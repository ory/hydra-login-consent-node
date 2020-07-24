var express = require('express');
var router = express.Router();
var url = require('url');
var setCookieParser = require('set-cookie-parser');
var querystring = require('querystring');
var kratos = require('../services/kratos')
var selfURL = process.env.SELF_URL;

// Sets up csrf protection
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

const { URLSearchParams } = require('url');

router.get('/', csrfProtection, function (req, res, next) {
  // Parses the URL query
  var query = url.parse(req.url, true).query
  // Get the token param
  var token = query.token;
  
  // Perform account recovery
  kratos.performRecoveryRequest(token)
    // This will be called if the HTTP request was successful
    .then(function (response) {
      // Get the location http response header
      var location = response.headers.get('location');
      // Parses the URL query
      var query = url.parse(location, true).query;
      // Get the request param
      var request = query.request;
      // If the account recovery request was successful, we should have a Kratos session cookie
      // This will be needed to access self-service flow and change the password...
      var combinedCookieHeader = response.headers.get('set-cookie');
      var splitCookieHeaders = setCookieParser.splitCookiesString(combinedCookieHeader)
      // Split the cookies
      var cookies = setCookieParser.parse(splitCookieHeaders, {
        decodeValues: true,  // default: true
        map: true            // default: false
      });
  
      var sessionCookie = '';
      console.log('session cookie='+cookies['ory_kratos_session']);
 
      // If the session cookie is undefined, it's most likely because a recovery link can only be used once, and 
      // now it's being re-used. The only sensible thing to do is to redirect to the recover page and display
      // an error message there
      if (cookies['ory_kratos_session'] == null || cookies['ory_kratos_session'] == 'undefined') {
        res.redirect(selfURL+'/recover?error=invalid_token');
      }
      else {       
        sessionCookie = cookies['ory_kratos_session'].value;
      
        console.log('session cookie='+sessionCookie);
        
        // Get the csrf_cookie
        var csrf = cookies['csrf_token'].value;
        
        // Get the settings request
        kratos.getSettingsRequest(request, csrf)
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
        
            res.render('password', {
              session: sessionCookie,
              csrfToken: t,
              _csrf: req.csrfToken(),
              csrfCookie: csrf,
              request: request
            });
          })
          // This will handle any error that happens when making HTTP calls to kratos
          .catch(function (error) {
             console.log(error);
             next(error);
          });
      }         
    })
    // This will handle any error that happens when making HTTP calls to kratos
    .catch(function (error) {
 
      error.body.then(function(val) {
        var message;
        
        if (typeof val == 'object') {
          message = val.error.message;
        }
        else {
          message = val;
        }
      
        res.render('password', {
          error: true,
          error_message: error.body,
          _csrf: req.csrfToken(),
        });
      });
    });
});

router.post('/set', csrfProtection, function (req, res, next) {
  // Get the session cookie from the hidden input field
  var session = req.body.session;
  // Get the csrf cookie
  var csrf = req.body.csrf_cookie;
  // Get the request parameter
  var request = req.body.request;
  // Get the csrf_token
  var csrf_token = req.body.csrf_token;
  // Get the new password
  var password = req.body.password;
    
  // Create a form body and append the fields we want to submit to Kratos
  var params = new URLSearchParams();
  params.append('password', password);
  params.append('csrf_token', csrf_token);
  
  // Set the new password
  kratos.setNewPasswordRequest(request, session, csrf, params)
    .then(function (response) {
      res.render('password', {
        success: true
      });
    })
    // This will handle any error that happens when making HTTP calls to kratos
    .catch(function (error) {
      
      error.body.then(function(val) {
        var message;
       
        if (typeof val == 'object') {
          message = val.error.message;
        }
        else {
          message = val;
        }
        
        res.render('password', {
          error: true,
          error_message: message,
          session: session,
          csrfToken: csrf_token,
          _csrf: req.csrfToken(),
          csrfCookie: csrf,
          request: request
        });
      });
    });
});

module.exports = router;
