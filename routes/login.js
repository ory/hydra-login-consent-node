var express = require('express');
var router = express.Router();
var url = require('url');
var hydra = require('../services/hydra')

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

      // If authentication can't be skipped we MUST show the login UI.
      res.render('login', {
        csrfToken: req.csrfToken(),
        challenge: challenge,
      });
    })
    // This will handle any error that happens when making HTTP calls to hydra
    .catch(function (error) {
      next(error);
    });
});

router.post('/', csrfProtection, function (req, res, next) {
  // The challenge is now a hidden input field, so let's take it from the request body instead
  var challenge = req.body.challenge;

  // Let's check if the user provided valid credentials. Of course, you'd use a database or some third-party service
  // for this!
  if (!(req.body.email === 'foo@bar.com' && req.body.password === 'foobar')) {
    // Looks like the user provided invalid credentials, let's show the ui again...

    res.render('login', {
      csrfToken: req.csrfToken(),

      challenge: challenge,

      error: 'The username / password combination is not correct'
    });
    return;
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

  // You could also deny the login request which tells hydra that no one authenticated!
  // hydra.rejectLoginRequest(challenge, {
  //   error: 'invalid_request',
  //   error_description: 'The user did something stupid...'
  // })
  //   .then(function (response) {
  //     // All we need to do now is to redirect the browser back to hydra!
  //     res.redirect(response.redirect_to);
  //   })
  //   // This will handle any error that happens when making HTTP calls to hydra
  //   .catch(function (error) {
  //     next(error);
  //   });
});

module.exports = router;
