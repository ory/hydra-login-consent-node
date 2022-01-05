var express = require('express');
var router = express.Router();
var app = require('express')();

const selfURL = process.env.SELF_URL;
const mockData = {
    login:{
        error: false,
        error_message: 'message',
        csrfToken: 'csrf_token',
        _csrf: 'req.csrfToken()',
        csrfCookie: 'csrf',
        flow: 'flow',
        challenge: 'challenge'
  },
  consent:{
    csrfToken: 'req.csrfToken()',
    challenge: 'challenge',
    requested_scope: ['openid'],
    user:'Username',
    client: {client_name:'Clientname',client_id:'id',policy_uri:'',tos_uri:''},
  }
}

const viewToTest = 'login'
const viewData = mockData[viewToTest]

router.get('/dev', function(req, res) {
    if (app.get('env') === 'development') {
        res.render(viewToTest,viewData);
    }else{
        res.redirect(selfURL);
    }
});
router.post('/dev', function (req, res, next) {
console.log(req.body.remember)
})
module.exports = router;
