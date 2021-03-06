var mongoose = require( 'mongoose' ),

 Schema   = mongoose.Schema;



var Tour = new Schema({
	code:String,
	name:String,
	status:String,
	days:Number,
	op:String,
	guide:String,
	departuredate:String,
	note:String,
	feedback:String,

	route:{

		_id:Schema.Types.ObjectId,
		code : String,
		name : String,
		days: Number,
		fare:[{
			no:Number,
			name:String,
			price:Number
		}],
		meal:[{
			no:Number,
			name:String,
			price:Number		
		}],
		admission:[{
			no:Number,
			name:String,
			price:Number		
		}],
		note : String,
		schedule:
			[{
				day:Number,
				from:String,
				via:String,
				to:String,
				scenic:[{
					_id:Schema.Types.ObjectId,
					no:Number,
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
					postcode:String
				}],
				itinerary:String
			}]
	},	
	group:[{
		no:Number,
		status:String,
		commission:Number,
		adjustamount:Number,
		bookdate:String,
		pickup:String,	
		dropoff:String,

		agency:{

			_id:Schema.Types.ObjectId,
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
			postcode:String
		},
		tourist:[{
			no:Number,
      		name:String,
			gender:String,
			age:Number,
			phone:String,
			roomtype:String,
			fare:String,
			meal:String,
			admission:String,
			fcommission:Number,
			mcommission:Number
		}]
		

	}],
	schedule:[{
		day:Number,
		from:String,
		via:String,
		to:String,
		hotel:{
			_id:Schema.Types.ObjectId,
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
			postcode:String
		},
		breakfast:{
			_id:Schema.Types.ObjectId,
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
			postcode:String
		},
		lunch:{
		
			_id:Schema.Types.ObjectId,
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
			postcode:String
		},
		dinner:{
		
			_id:Schema.Types.ObjectId,
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
			postcode:String
		},
		scenic:[{
	  		_id:Schema.Types.ObjectId,
			no:Number,
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
			postcode:String
		}],
		itinerary:String
		
	}]
,
	bus:[{
		no:Number,
		plateno:String,
		driver:String,
		seats:Number,
		phone:String,
		note:String,
		buscom:
		{

			_id:Schema.Types.ObjectId,
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
			postcode:String
		}
		
	}]
});

var Route = new Schema({
	code : String,
	name : String,
	days: Number,
	fare:[{
		no:Number,
		name:String,
		price:Number
	}],
	meal:[{
		no:Number,
		name:String,
		price:Number		
	}],
	admission:[{
		no:Number,
		name:String,
		price:Number		
	}],
	note : String,
	schedule:
		[{
			day:Number,
			from:String,
			via:String,
			to:String,
			scenic:[{
				type : Schema.Types.ObjectId,
		    	ref : 'Partner'
			}],
			itinerary:String
		}]
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
	roomtype:String,
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
	tourcom:{
		name:String,
		address:String,
		city:String,
		province:String,
		country:String,
		postcode:String,
		telephone:String,
		fax:String,
		email:String,
		contact:String,
		regno:String
	},
	finance:{
		commission:Number	
	}
	
});


var Confirmation = new Schema({
	no:String,
	tourcode:String,
	groupno:Number,
	tourname:String,
	departuredate:String,
	issuedate:String,
	bookdate:String,
	op:String,
	pickup:String,
	dropoff:String,
	remark:String,
	status:String,
	tourcom:{
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
	agency:{
			// type : Schema.Types.ObjectId,
	  //  	ref : 'Information'		
		_id:Schema.Types.ObjectId,
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
	},
	tourist:[{
		name:String,
		age:Number,
		gender:String,		
		roomtype:String,
		phone:String,
		fare:String,
		admission:String,
		meal:String

	}]
	
});

var Invoice = new Schema({
	no:String,
	cfmno:String,
	tourcode:String,
	tourname:String,
	op:String,
	issuedate:String,
	departuredate:String,
	remark:String,
	taxable:Number,
	nontaxable:Number,
	tax:Number,
	total:Number,
	status:String,
	tourcom:{
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
	agency:{
			// type : Schema.Types.ObjectId,
	  //  	ref : 'Information'		
		_id:Schema.Types.ObjectId,
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
		postcode:String		
	},
	tourist:[{
		name:String,
		age:Number,
		gender:String,		
		roomtype:String,
		phone:String,
		faretype:String,
		fare:Number,
		admission:Number,
		meal:Number,
		commission:Number,
		adjustamount:Number,
		amount:Number

	}]
});

var Payable = new Schema({
	paytype : Number, //0-voucher,1-cash,2-creditcard, 3-cheque...
	status : Number, //0-new,1-pending,9-paied...
	payee:{ type: Schema.Types.ObjectId, ref: 'Partner' },
	payeecode : String, //duplicated data for query
    tour :{ type: Schema.Types.ObjectId, ref: 'Tour' },
    tourcode : String, //duplicated data for query
    invoice : String, //invoice NO.
    amount : Number,
    tax : Number,
    total : Number,
    date : Date,
    note : String
});


var Partner = new Schema({
	type : String, //A-agency/H-hotel/R-restaurant/S-admission,B-BUS
	code : String,
	name : String,
	name_cn:String,
	payment:String, //credit card/voucher/cheque/cash
	telphone : String,
	fax:String,
	contact : String,
	cellphone: String,
	email:String,
	address : String,
	city: String,
	province: String,
	country :String,
	postcode:String,
	note: String
});
var Counter = new Schema({
	countername:String,
	seq:Number
});

mongoose.model( 'Partner', Partner );
mongoose.model( 'Route', Route );
mongoose.model( 'Tour', Tour );

mongoose.model( 'Passenger', Passenger );
mongoose.model( 'Bus', Bus );
mongoose.model( 'Setting', Setting );
mongoose.model( 'Confirmation', Confirmation );
mongoose.model( 'Invoice', Invoice );
mongoose.model( 'Payable', Payable );
mongoose.model( 'Counter', Counter );


var host = process.env.OPENSHIFT_MONGODB_DB_HOST||"localhost";
var port = process.env.OPENSHIFT_MONGODB_DB_PORT||'27017';
var username = process.env.OPENSHIFT_MONGODB_DB_USERNAME||'';
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD||'';
 
mongoose.connect( 'mongodb://'+username+':'+password+'@'+host+':'+port+'/tour' );

