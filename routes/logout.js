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

  // The challenge is used to fetch information about the logout request from ORY Hydra.
  var challenge = query.logout_challenge;

  hydra.getLogoutRequest(challenge)
  // This will be called if the HTTP request was successful
    .then(function (response) {
      // Here we have access to e.g. response.subject, response.sid, ...

      // The most secure way to perform a logout request is by asking the user if he/she really want to log out.
      res.render('logout', {
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

  if (req.body.submit === 'No') {
    return hydra.rejectLogoutRequest(challenge)
      .then(function () {
        // The user did not want to log out. Let's redirect him back somewhere or do something else.
        res.redirect('https://www.ory.sh/');
      })
      // This will handle any error that happens when making HTTP calls to hydra
      .catch(function (error) {
        next(error);
      });
  }

  // The user agreed to log out, let's accept the logout request.
  hydra.acceptLogoutRequest(challenge)
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
