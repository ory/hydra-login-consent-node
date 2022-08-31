import express from 'express'
import url from 'url'
import csrf from 'csurf'
import { hydraAdmin } from '../config'

// Sets up csrf protection
const csrfProtection = csrf({ cookie: true })
const router = express.Router()

router.get('/', csrfProtection, (req, res, next) => {
  // Parses the URL query
  const query = url.parse(req.url, true).query

  // The challenge is used to fetch information about the login request from ORY Hydra.
  const challenge = String(query.device_challenge)
  if (!challenge) {
    next(new Error('Expected a login challenge to be set but received none.'))
    return
  }

  // Parses the URL query
  const userCode = String(query.user_code)

  hydraAdmin
    .getDeviceRequest(challenge)
    // This will be called if the HTTP request was successful
    .then(({ data: deviceRequest }) => {
      // All we need to do now is to redirect the user back to hydra!
      console.log(deviceRequest)
      res.render('device', {
        csrfToken: req.csrfToken(),
        challenge,
        userCode
      })
    })
    // This will handle any error that happens when making HTTP calls to hydra
    .catch(next)
})

router.post('/', csrfProtection, (req, res, next) => {
  // The code is a input field, so let's take it from the request body
  const { code: userCode, challenge } = req.body

  console.log(`In post: ${challenge} | ${userCode}`)
  hydraAdmin
    .getDeviceRequest(challenge)
    // This will be called if the HTTP request was successful
    .then(({ data: deviceRequest }) => {
      console.log(deviceRequest)
      // All we need to do now is to redirect the user back to hydra!
      hydraAdmin
        .verifyDeviceRequest(challenge, {
          user_code: userCode
        })
        .then(({ data: body }) => {
          // All we need to do now is to redirect the user back to hydra!
          res.redirect(String(body.redirect_to))
        })
    })
    // This will handle any error that happens when making HTTP calls to hydra
    .catch(next)
})

export default router
