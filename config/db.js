var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

//blog
var Blog = new Schema({
	title : String,
	content : String,
	tag : String,
	time : Date	
});


mongoose.model( 'Blog', Blog );


var host = process.env.OPENSHIFT_MONGODB_DB_HOST||"localhost";
var port = process.env.OPENSHIFT_MONGODB_DB_PORT||'27017';
var username = process.env.OPENSHIFT_MONGODB_DB_USERNAME||'';
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD||'';
 
mongoose.connect( 'mongodb://'+username+':'+password+'@'+host+':'+port+'/sunorth' );