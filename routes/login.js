var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
var hydra = require('../services/hydra')
var kratos = require('../services/kratos')

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
      kratos.getLoginRequest()
        // This will be called if the HTTP request was successful
        .then(function (response) {
          // Get the location header of the re-direct
          var location = response.headers.get('location');
          // Get the csrf_token set-Cookie header
          var cookie = response.headers.get('set-cookie');
          // Get the cookie value
          cookie = cookie.substring('csrf_token'.length + 1);
          // Create the redirect URL
          var redirect_to = new URL(location + '&' + querystring.stringify({['challenge']: challenge, 'csrf_token': cookie}));
          // Redirect
          //res.redirect(redirect_to.toString());
          res.location(redirect_to.toString());
          res.status(302).send();
        })
        // This will handle any error that happens when making HTTP calls to kratos
        .catch(function (error) {
           console.log(error);
           next(error);
        }); 
    })
    // This will handle any error that happens when making HTTP calls to hydra
    .catch(function (error) {
      next(error);
    });
});

// Below block moved to kratos.js...

router.post('/', csrfProtection, function (req, res, next) {
  // The challenge is now a hidden input field, so let's take it from the request body instead
  var challenge = req.body.challenge;
  // Get the Kratos session cookie, if the login was successful
  var session = req.body.ory_kratos_session;
  
  console.log('Kratos session cookie:', session);

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
  
  if (session == null || session == undefined) {
    // Looks like the login ws unsuccessful
    return hydra.rejectLoginRequest(challenge, {
      error: 'access_denied',
      error_description: 'The resource owner failed to login'
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

  // Seems like the user authenticated! Let's tell hydra...
  hydra.acceptLoginRequest(challenge, {
    // Subject is an alias for user ID. A subject can be a random string, a UUID, an email address, ....
    subject: 'foo@bar.com',

    // This tells hydra to remember the browser and automatically authenticate the user in future requests. This will
    // set the "skip" parameter in the other route to true on subsequent requests!
    remember: Boolean(req.body.remember),

    // When the session expires, in seconds. Set this to 0 so it will never expire.
    remember_for: 3600,

    // Sets which "level" (e.g. 2-factor authentication) of authentication the user has. The value is really arbitrary
    // and optional. In the context of OpenID Connect, a value of 0 indicates the lowest authorization level.
    // acr: '0',
  })
  .then(function (response) {
    // All we need to do now is to redirect the user back to hydra!
    res.redirect(response.redirect_to);
  })
  // This will handle any error that happens when making HTTP calls to hydra
  .catch(function (error) {
    next(error);
  });

});

module.exports = router;
