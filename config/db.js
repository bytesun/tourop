var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

//blog
var Blog = new Schema({
	title : String,
	content : String,
	tag : String,
	time : Date	
});

var Tour = new Schema({
	routecode:String,
	code:String,
	name:String,
	status:String,
	days:Number,
	op:String,
	guide:String,
	departuredate:String,
	note:String,
	passenger:[{
		no:Number,
		group:Number,
		name:String,
		gender:String,
		age:Number,
		phone:String,
		fee:Number,
		meal:Number,
		admission:Number,
		pickup:String,	
		dropoff:String,
		agency:String
	}],
	itinerary:[{
		day:Number,
		from:String,
		via:String,
		to:String,
		hotel:String,
		breakfast:String,
		lunch:String,
		dinner:String,
		itinerary:String
		
	}]
,
	bus:[{
		no:Number,
		plateno:String,
		driver:String,
		seats:Number,
		agency:String,
		note:String
	}]
});

var Route = new Schema({
	code : String,
	name : String,
	days: Number,
	fee_tour_adult:Number,
	fee_tour_senior:Number,
	fee_tour_youth:Number,
	fee_tour_child:Number,
	fee_tour_infant:Number,

	fee_meal_adult:Number,
	fee_meal_senior:Number,
	fee_meal_youth:Number,
	fee_meal_child:Number,
	fee_meal_infant:Number,

	fee_adm_adult:Number,
	fee_adm_senior:Number,
	fee_adm_youth:Number,
	fee_adm_child:Number,
	fee_adm_infant:Number,
	itinerary:
		[{
			day:Number,
			from:String,
			via:String,
			to:String,
			itinerary:String
		}]
	,
	note : String
});

var Information = new Schema({
	type : String, //1-agency/2-hotel/3-restaurant/4-admission
	code : String,
	name : String,
	payment:String, //credit card/voucher/cheque/cash
	telphone : String,
	contact : String,
	address : String,
	city: String,
	province: String,
	country :String,
	postcode:String,
	note: String
});

var Passenger = new Schema({
	no:Number,
	group:Number,
	tour:String,
	name:String,
	gender:String,
	age:Number,
	phone:String,
	fee:Number,
	meal:Number,
	admission:Number,
	pickup:String,	
	dropoff:String,
	confirmation:String,
	invoice:String,
	agency:String
	
	
});

var Bus = new Schema({
	no:Number,
	tour:String,
	plateno:String,
	driver:String,
	phone:String,
	seats:Number,	
	agency:String,
	note:String
});

mongoose.model( 'Blog', Blog );
mongoose.model( 'Route', Route );
mongoose.model( 'Tour', Tour );
mongoose.model( 'Information', Information );
mongoose.model( 'Passenger', Passenger );
mongoose.model( 'Bus', Bus );


var host = process.env.OPENSHIFT_MONGODB_DB_HOST||"localhost";
var port = process.env.OPENSHIFT_MONGODB_DB_PORT||'27017';
var username = process.env.OPENSHIFT_MONGODB_DB_USERNAME||'';
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD||'';
 
mongoose.connect( 'mongodb://'+username+':'+password+'@'+host+':'+port+'/tour' );
