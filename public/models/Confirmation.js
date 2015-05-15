// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
        	 urlRoot: '/api/confirmations',
  	       idAttribute: '_id',
            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {
            	no:0,
            	tourcode:'',
            	groupno:1,
            	tourname:'',
            	departuredate:'2015-5-15',
            	issuedate:'',
            	bookdate:'',
            	op:'',
        		pickup:'',
        		dropoff:'',
            	remark:'',
            	tourcom:{
            		name:'CANTOP TOUR & TRAVEL LTD',
            		address:'#202-644 S.W. Marine Drive',
            		city:'Vancouver',
            		province:'B.C.',
            		
            		country:'Canada',
            		postcode:'V6P 5Y1',
            		telephone:'(604) 325-4699',
            		fax:'(604) 325-7055 ',
            		regno:'2783'
            	},
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
            		postcode:'',
            	},
            	passenger:[{
            		name:'',
            		age:1,
            		gender:'',
            		roomtype:'',
            		phone:'',
            		fare:'',
            		admission:'',
            		meal:''

            	}]
            	
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);