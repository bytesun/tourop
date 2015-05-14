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
            	tourname:'',
            	departuredate:'',
            	issuedate:'',
            	bookdate:'',
            	op:'',
            	agencyop:'',
            	taxablesub:0,
            	nontaxablesub:0,
            	gst:0,
            	total:0,
            	remark_c:'',
            	remark_i:'',
            	issuefrom:{
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
            	issueto:{
            		name:'',
            		address:'',
            		city:'',
            		province:'',
            		country:'',
            		postcode:'',
            		telephone:'',
            		fax:''
            	},
            	passenger:{
            		name:'',
            		faretype:'',
            		fare:0,
            		admission:0,
            		meal:0,
            		pickup:'',
            		dropoff:''
            	}
            	
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);