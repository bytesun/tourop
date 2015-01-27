var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.sendFile('index.html');
});
router.get('/orcsun', function(req, res) {
    res.render('orcsun');
});
module.exports = router;
