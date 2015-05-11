var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

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
		fee:String,
		meal:String,
		admission:String,
		bookdate:String,
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
		phone:String,
		buscom:String,
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
	fax:String,
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

var Setting = new Schema({
		name:String,
		address:String,
		city:String,
		province:String,
		country:String,
		postcode:String,
		phone:String,
		fax:String,
		email:String,
		contact:String,
		regno:String,
	commission:Number
});


var Confirmation = new Schema({
	no:String,
	tour:String,
	departuredate:String,
	issuedate:String,
	bookingdate:String,
	op:String,
	agencyop:String,
	issuefrom:{
		name:String,
		address:String,
		city:String,
		province:String,
		country:String,
		postcode:String,
		telephone:String,
		fax:String,
		regno:String
	},
	issueto:{
		name:String,
		address:String,
		city:String,
		province:String,
		country:String,
		postcode:String,
		telephone:String,
		fax:String
	},
	passenger:{
		name:String,
		admission:String,
		meal:String,
		pickup:String
	},
	remark:String
});

var Invoice = new Schema({
	no:String,
	issuedate:String,
	cfmno:String,
	agency:String,
	issueby:String,
	tourcode:String,
	tourname:String,
	departuredate:String,
	passenger:{
		no:Number,
		name:String,
		rate:String,
		meal:String,
		
	},
	remark:String
	
});

mongoose.model( 'Route', Route );
mongoose.model( 'Tour', Tour );
mongoose.model( 'Information', Information );
mongoose.model( 'Passenger', Passenger );
mongoose.model( 'Bus', Bus );
mongoose.model( 'Setting', Setting );
mongoose.model( 'Confirmation', Confirmation );
mongoose.model( 'Invoice', Invoice );



var host = process.env.OPENSHIFT_MONGODB_DB_HOST||"localhost";
var port = process.env.OPENSHIFT_MONGODB_DB_PORT||'27017';
var username = process.env.OPENSHIFT_MONGODB_DB_USERNAME||'';
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD||'';
 
mongoose.connect( 'mongodb://'+username+':'+password+'@'+host+':'+port+'/tour' );
