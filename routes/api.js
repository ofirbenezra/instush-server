var express = require('express');
var router = express.Router();
var InstagramClient  = require('../InstagramClient/instagram-client')

/* GET users listing. */
router.get('/', function(req, res, next) {
    let promiseObj = InstagramClient.getProps(req.query.tag, req.query.minTagId).then((body) => {
        res.json(body);
    });
});

module.exports = router;
