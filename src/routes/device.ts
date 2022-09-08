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

  res.render('device', {
    csrfToken: req.csrfToken(),
    challenge,
    userCode
  })
})

router.post('/', csrfProtection, (req, res, next) => {
  // The code is a input field, so let's take it from the request body
  const { code: userCode, challenge } = req.body

  console.log(`In post: ${challenge} | ${userCode}`)

  // All we need to do now is to redirect the user back to hydra!
  hydraAdmin
    .verifyDeviceRequest(challenge, {
      user_code: userCode
    })
    .then(({ data: body }) => {
      // All we need to do now is to redirect the user back to hydra!
      res.redirect(String(body.redirect_to))
    })
    .catch(next)
})

export default router
