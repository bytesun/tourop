var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.sendFile('index.html');
});
router.get('/login', function(req, res) {
    res.render('login');
});
router.get('/orcsun', function(req, res) {
    res.render('orcsun');
});
router.get('/blog', function(req, res) {
    res.render('blog');
});
router.get('/tour', function(req, res) {
    res.render('tour');
});
module.exports = router;
