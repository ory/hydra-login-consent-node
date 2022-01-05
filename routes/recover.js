var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
var kratos = require('../services/kratos');

// Sets up csrf protection
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

const { URLSearchParams } = require('url');

router.get('/', csrfProtection, function (req, res, next) {
  // Check for errors
  var err = url.parse(req.url, true).query.error;
        
  // Initiate the account recovery flow
  kratos.initiateAccountRecoveryFlow()
    // This will be called if the HTTP request was successful
    .then(function (response) {
      // Get the location http response header
      var location = response.headers.get('location');
      // Parses the URL query
      var query = url.parse(location, true).query;
      // Get the request param
      var flow = query.flow;
      // Get the csrf cookie from http header
      var cookie = response.headers.get('set-cookie');
      
      // Get the account recovery request
      kratos.getAccountRecoveryFlow(flow, cookie)
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
          
          if (err == 'invalid_token') {
            err = ['The recovery token has either expired or has already been used. Please try again.'];
          }
          
          res.render('recover', {
            success: false,
            error: (err != null),
            error_message : err,
            csrfToken: t,
            _csrf: req.csrfToken(),
            csrfCookie: cookie,
            flow: flow
          });
        })
        // This will handle any error that happens when making HTTP calls to kratos
        .catch(function (error) {
          logger.error(error);
          next(error);
        });
    })
    // This will handle any error that happens when making HTTP calls to kratos
    .catch(function (error) {
       logger.error(error);
       next(error);
    });
});

router.post('/', csrfProtection, function (req, res, next) {
  // Get the email field
  var subject = req.body.identifier;
  // Get the method field
  var method = req.body.method;
  // The flow param is now a hidden input field, so let's take it from the request body instead
  var flow = req.body.flow;
  // Get the csrf cookie
  var csrf = req.body.csrf_cookie;
  // Get the csrf_token field
  var csrf_token = req.body.csrf_token;
  
  var params = new URLSearchParams();
  params.append('email', subject);
  params.append('method', method);
  params.append('csrf_token', csrf_token);
  
  // Accept the recovery request
  kratos.completeRecoveryFlow(flow, csrf, params)
    .then(function (response) {
      
      res.render('recover', {
        success: true
      });
    })
  // This will handle any error that happens when making HTTP calls to kratos
  .catch(function (error) {
    error.body.then(function(val) {
        
      var message;
          
      if (typeof val == 'object') {
        message = [val.error.message];
      } else {
        message = [val];
      }
      
      logger.error(message);
      
      res.render('recover', {
        success: false,
        error: (message != null),
        error_message : message,
        csrfToken: csrf_token,
        _csrf: req.csrfToken(),
        csrfCookie: csrf,
        flow: flow
      });
    });
  });
});

module.exports = router;
