// Model.js
// --------
define(["jquery", "backbone"],
		function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
        	urlRoot: '/api/tours',
  	        idAttribute: '_id',
  			initialize: function() {
  			},
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
            		fare:[{
            			no:1,
            			name:'',
            			price:0
            		}],
            		meal:[{
            			no:1,
            			name:'',
            			price:0		
            		}],
            		admission:[{
            			no:1,
            			name:'',
            			price:0		
            		}],
            		note : '',
            		schedule:
            			[{
            				day:1,
            				from:'',
            				via:'',
            				to:'',
            				scenic:[{
            					name:'',
            					telephone:'',
            					address:'',
            					city:'',
            					province:'',
            					payment:''
            				}],
            				itinerary:''
            			}]
            	},	
            	group:[{
            		no:1,
            		status:'New',
            		commission:20,
            		adjustamount:0,
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
            		tourist:[{
            			no:1,
                  		name:'',
            			gender:'',
            			age:0,
            			phone:'',
            			roomtype:'',
            			fare:'',
            			meal:'',
            			admission:'',
            			fcommission:20,
            			mcommission:0
            		}]
            		

            	}],
            	schedule:[{
            		day:1,
            		from:'',
            		via:'',
            		to:'',
            		hotel:{
            			
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
            		breakfast:{
            			
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
            		lunch:{

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
            		dinner:{

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
            		scenic:[{

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
            		}],
            		itinerary:''
            		
            	}]
            ,
            	bus:[{
            		no:1,
            		plateno:'',
            		driver:'',
            		seats:0,
            		phone:'',
            		note:'',
            		buscom:
            		{

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
            },
            validate: function(attrs, options) {
            	console.log('valdate tour model code '+attrs.code);
            	if(attrs.code == '' || attrs.code == undefined){
            		return "tour code is required!";
            	}else  if(attrs.name == '' || attrs.name == undefined){
            		return "tour name is required!";
            	}else  if(attrs.departuredate == '' || attrs.departuredate == undefined){
            		return "tour departuredate is required!";
            	}

            }
        });
        // Returns the Model class
        return Model;

    }

);