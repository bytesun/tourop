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

	
	router.get('/api/auth',isAuthenticated, function(req, res) {
    	// Display the Login page with any flash message, if any
		res.send({ user: req.user });
		
		//
	});	
	router.post('/api/auth/login', function(req, res, next) {
		  passport.authenticate('login', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { return res.redirect('/login'); }
		    req.logIn(user, function(err) {
		      if (err) { return next(err); }
		      return res.send({user:user});
		    });
		  })(req, res, next);
		});	
	
	router.post('/api/auth/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});
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

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
