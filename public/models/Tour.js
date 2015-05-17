// Model.js
// --------
define(["jquery", "backbone"],
		function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
        	 urlRoot: '/api/tours',
  	       idAttribute: '_id',
            // Default values for all of the Model attributes
            defaults: {
            	code:'',
            	name:'',
            	status:'New',
            	days:1,
            	op:'',
            	guide:'',
            	departuredate:'',
            	note:'',
            	feedback:'',

            	route:{
            		code : '',
            		name : '',
            		days: 1,
            		fee_tour_adult:0,
            		fee_tour_senior:0,
            		fee_tour_youth:0,
            		fee_tour_child:0,
            		fee_tour_infant:0,

            		fee_meal_adult:0,
            		fee_meal_senior:0,
            		fee_meal_youth:0,
            		fee_meal_child:0,
            		fee_meal_infant:0,

            		fee_adm_adult:0,
            		fee_adm_senior:0,
            		fee_adm_youth:0,
            		fee_adm_child:0,
            		fee_adm_infant:0,
            		note : '',
            		itinerary:
            			[{
            				day:1,
            				from:'',
            				via:'',
            				to:'',
            				itinerary:''
            			}]
            	},	
            	group:[{
            		no:1,
            		status:'New',
            		commission:0.1,
            		bookdate:'',
            		pickup:'',	
            		dropoff:'',
            		agency:{
            			code : '',
            			name : '',
            			payment:'', //credit card/voucher/cheque/cash
            			telphone : '',
            			fax:'',
            			contact : '',
            			address : '',
            			city: '',
            			province: '',
            			country :'',
            			postcode:''
            		},
            		passenger:[{
            			no:1,
                  		name:'',
            			gender:'',
            			age:1,
            			phone:'',
            			roomtype:'',
            			fare:'',
            			meal:'',
            			admission:''
            		}]
            	}],
            	itinerary:[{
            		day:1,
            		from:'',
            		via:'',
            		to:'',
            		hotel:'',
            		breakfast:'',
            		lunch:'',
            		dinner:'',
            		itinerary:''
            		
            	}]
            ,
            	bus:[{
            		no:1,
            		plateno:'',
            		driver:'',
            		seats:10,
            		phone:'',
            		note:'',
            		buscom:
            			{
            			type : '', //1-agency/2-hotel/3-restaurant/4-admission
            			code : '',
            			name : '',
            			payment:'', //credit card/voucher/cheque/cash
            			telphone : '',
            			fax:'',
            			contact : '',
            			address : '',
            			city: '',
            			province: '',
            			country :'',
            			postcode:''
            		}
            		
            		
            	}]
            }
        }
        );
        // Returns the Model class
        return Model;

    }

);