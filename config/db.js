var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

//blog
var Blog = new Schema({
	title : String,
	content : String,
	tag : String,
	time : Date	
});

var Route = new Schema({
	
});

var Agency = new Schema({
	
});

var Restaurant = new Schema({
	
});

var Hotel = new Schema({
	code : String,
	name : String,
	address : String,
	phone : String,
	contact : String
});


mongoose.model( 'Blog', Blog );
mongoose.model( 'Route', Route );
mongoose.model( 'Agency', Agency );
mongoose.model( 'Restaurant', Restaurant );
mongoose.model( 'Hotel', Hotel );

var host = process.env.OPENSHIFT_MONGODB_DB_HOST||"localhost";
var port = process.env.OPENSHIFT_MONGODB_DB_PORT||'27017';
var username = process.env.OPENSHIFT_MONGODB_DB_USERNAME||'';
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD||'';
 
mongoose.connect( 'mongodb://'+username+':'+password+'@'+host+':'+port+'/sunorth' );