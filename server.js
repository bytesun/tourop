// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session        = require('express-session');
var csrf           = require('csurf');

//-------------------------------------------------------
var passport = require('passport');

//Using the flash middleware provided by connect-flash to store messages in session
//and displaying in templates
var flash = require('connect-flash');
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use(session({secret: 'ssssffffopencase',saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());


// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

app.use(csrf());
// routes ==================================================

//config files
var db = require('./config/db');
var index = require('./routes/index')(passport);
var information = require('./routes/information');
var route = require('./routes/route');
var tour = require('./routes/tour');
var setting = require('./routes/setting');
var confirmation = require('./routes/confirmation');
var invoice = require('./routes/invoice');
var user = require('./routes/user');

app.use('/', index);
app.use('/', information);
app.use('/', route);
app.use('/', tour);
app.use('/', setting);
app.use('/', confirmation);
app.use('/', invoice);
app.use('/', user);

app.use(function(req, res, next){
	  var err = req.session.error,
	      msg = req.session.notice,
	      success = req.session.success;

	  delete req.session.error;
	  delete req.session.success;
	  delete req.session.notice;

	  if (err) res.locals.error = err;
	  if (msg) res.locals.notice = msg;
	  if (success) res.locals.success = success;

	  next();
	});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});


var server = app.listen(parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080,process.env.OPENSHIFT_NODEJS_IP, function() {
console.log('Express server listening on port ' + server.address().port);
});
   