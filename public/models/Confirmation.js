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
            	departuredate:'',
            	issuedate:'',
            	bookdate:'',
            	op:'',
            	remark:'',
            	tourcom:{
            		name:'',
            		address:'',
            		city:'',
            		province:'',
            		country:'',
            		postcode:'',
            		telephone:'',
            		fax:'',
            		regno:''
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
            		roomtype:'',
            		phone:'',
            		fare:'',
            		admission:'',
            		meal:'',
            		pickup:'',
            		dropoff:''
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