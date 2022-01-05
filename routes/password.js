var express = require('express');
var router = express.Router();
var url = require('url');
var setCookieParser = require('set-cookie-parser');
var querystring = require('querystring');
var kratos = require('../services/kratos')
var selfURL = process.env.SELF_URL;
var domain = process.env.DOMAIN;

// Sets up csrf protection
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

const { URLSearchParams } = require('url');

router.get('/', csrfProtection, function (req, res, next) {
  // Parses the URL query
  var query = url.parse(req.url, true).query
  // Get the flow param
  var flow = query.flow;
  // Get the token param
  var token = query.token;

  // Perform account recovery
  kratos.useRecoveryLink(flow, token)
    // This will be called if the HTTP request was successful
    .then(function (response) {
      // Get the location http response header
      var location = response.headers.get('location');
      // Parses the URL query
      var query = url.parse(location, true).query;
      // Get the flow param
      var id = query.flow;
      // If the account recovery request was successful, we should have a Kratos session cookie
      // This will be needed to access self-service flow and change the password...
      var combinedCookieHeader = response.headers.get('set-cookie');
      var splitCookieHeaders = setCookieParser.splitCookiesString(combinedCookieHeader)
      // Split the cookies. Sinc we don't know the name of the csrf_token, split as array
      var cookies = setCookieParser.parse(splitCookieHeaders, {
        decodeValues: true,  // default: true
        map: false            // default: false
      });

      var sessionCookie = '';
      var csrfCookie = '';
      
      cookies.forEach((element) => {
        if (element.name == 'ory_kratos_session') {
          sessionCookie = element.value;
        } else if (element.name.startsWith('csrf_token')) {
          csrfCookie = element.name + '=' + element.value;
        }
      });

      // If the session cookie is undefined, it's most likely because a recovery link can only be used once, and 
      // now it's being re-used. The only sensible thing to do is to redirect to the recover page and display
      // an error message there
      if (sessionCookie == '') {
        res.redirect(selfURL + '/recover?error=invalid_token');
      }
      else {
        
        // Get the settings request
        kratos.getSettingsRequest(id, sessionCookie)
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

            res.render('password', {
              session: sessionCookie,
              csrfToken: t,
              _csrf: req.csrfToken(),
              csrfCookie: csrfCookie,
              flow: id
            });
          })
          // This will handle any error that happens when making HTTP calls to kratos
          .catch(function (error) {
            logger.error(error);
            next(error);
          });
      }
    })
    // This will handle any error that happens when making HTTP calls to kratos
    .catch(function (error) {

      error.body.then(function (val) {
        var message;

        if (typeof val == 'object') {
          message = val.error.message;
        }
        else {
          message = val;
        }
        
        logger.error(error);

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
  // Get the flow parameter
  var flow = req.body.flow;
  // Get the csrf_token
  var csrf_token = req.body.csrf_token;
  // Get the new password
  var password = req.body.password;

  // Create a form body and append the fields we want to submit to Kratos
  var params = new URLSearchParams();
  params.append('method', 'password');
  params.append('password', password);
  params.append('csrf_token', csrf_token);

  // Set the new password
  kratos.setNewPasswordRequest(flow, session, csrf, params)
    .then(function () {
      // Get session information
      kratos.getSessionIdentity(session)
        .then(function (response) {

          var id = response.identity.id;
          var schemaId = response.identity.schema_id;
          var traits = response.identity.traits;
          var state = response.identity.state;

          if (traits != null) {
            traits.status = traits.status == "CREATED" ? "ACTIVE" : traits.status;
            
            var body = {
              "schema_id": schemaId,
              "state": state,
              "traits": traits
              
            };
            kratos.updateIdentity(id, JSON.stringify(body)).then(function () {});
            res.render('password', {
              success: true,
              domain: domain
            });
          }
        })

    })
    // This will handle any error that happens when making HTTP calls to kratos
    .catch(function (error) {

      error.body.then(function (val) {
        var message;

        if (typeof val == 'object') {
          message = val.error.message;
        }
        else {
          message = val;
        }
        
        logger.error(error);

        res.render('password', {
          error: true,
          error_message: message,
          session: session,
          csrfToken: csrf_token,
          _csrf: req.csrfToken(),
          csrfCookie: csrf,
          flow: flow
        });
      });
    });
});

module.exports = router;
