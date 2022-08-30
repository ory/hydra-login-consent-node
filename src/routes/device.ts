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

  res.render('device', {
    csrfToken: req.csrfToken()
  })
})

router.post('/', csrfProtection, (req, res, next) => {
  // The code is a input field, so let's take it from the request body
  const code = req.body.code as string

  hydraAdmin
    .verifyDeviceRequest({
      user_code: code
    })
    // This will be called if the HTTP request was successful
    .then(({ data: body }) => {
      // All we need to do now is to redirect the user back to hydra!
      res.redirect(String(body.redirect_to))
    })
    // This will handle any error that happens when making HTTP calls to hydra
    .catch(next)
})

export default router
