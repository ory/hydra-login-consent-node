var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
var hydra = require('../services/hydra')
var kratos = require('../services/kratos');

// Sets up csrf protection
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

router.get('/', csrfProtection, function (req, res, next) {
  // Parses the URL query
  var query = url.parse(req.url, true).query;
  // The challenge is used to fetch information about the login request from ORY Hydra.
  var challenge = query.login_challenge;
  
  hydra.getLoginRequest(challenge)
  // This will be called if the HTTP request was successful
    .then(function (response) {
      // If hydra was already able to authenticate the user, skip will be true and we do not need to re-authenticate
      // the user.
      if (response.skip) {
        // You can apply logic here, for example update the number of times the user logged in.
        // ...

        // Now it's time to grant the login request. You could also deny the request if something went terribly wrong
        // (e.g. your arch-enemy logging in...)
        return hydra.acceptLoginRequest(challenge, {
          // All we need to do is to confirm that we indeed want to log in the user.
          subject: response.subject
        }).then(function (response) {
          // All we need to do now is to redirect the user back to hydra!
          res.redirect(response.redirect_to);
        });
      }

      // Initiate the Kratos login
      kratos.initiateLoginRequest()
        // This will be called if the HTTP request was successful
        .then(function (response) {
          // Get the location header of the re-direct
          var location = response.headers.get('location');
          // Get the csrf_token set-Cookie header
          var cookie = response.headers.get('set-cookie');
          // Create the redirect URL
          var redirect_to = new URL(location + '&' + querystring.stringify({['challenge']: challenge, 'csrf_token': cookie}));
          // Redirect
          res.redirect(redirect_to.toString());
        })
        // This will handle any error that happens when making HTTP calls to kratos
        .catch(function (error) {
           logger.error(error);
           next(error);
        }); 
    })
    // This will handle any error that happens when making HTTP calls to hydra
    .catch(function (error) {
      logger.error(error);
      next(error);
    });
    
});

module.exports = router;
