var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function(passport){

	router.get('/', isAuthenticated,function(req, res) {
		res.cookie('user.uname',req.user.username);
		res.cookie('user.displayname',req.user.displayname);
		res.cookie('user.id',req.user._id.toString());
		res.cookie('user.email',req.user.email);
		res.render('index',{csrfToken: req.csrfToken(),user:req.user});
	});	
	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { csrfToken: req.csrfToken(), message: req.flash('message') });
		//
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true  
	}));


	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('signup',{csrfToken: req.csrfToken(),message: req.flash('message')});
	});

	
	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true  
	}));



	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
