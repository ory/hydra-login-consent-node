var url = require('url');
var querystring = require('querystring');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    var query = url.parse(req.url, true).query;
    var error = query.error;
    var error_description = query.error_description;

    res.render('errors', {
        error: error,
        error_description: error_description
    });
});

module.exports = router;
