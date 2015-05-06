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
        		routecode:'',
        		code:'',
        		name:'Tour Information',
        		status:'New', //new, confirm ,close
        		op:'',
        		guide:'',
        		departuredate:'',
        		days:'',
        		passenger:[{
        			no:1,
        			group:1,
        			name:'',
        			gender:'',
        			age:0,
        			phone:'',
        			fee:0.0,
        			meal:0.0,
        			admission:0.0,
        			pickup:'',
        			dropoff:'',
//        			confirmation:'',
//        			invoice:'',
        			agency:''
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
        		}] ,
        		bus:[{
        			no:'',
        			plateno:'',
        			driver:'',
        			seats:Number,        			
        			note:''
        		}],
        		note:''
            }
        });
        // Returns the Model class
        return Model;

    }

);