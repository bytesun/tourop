// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
            // Model Constructor
            initialize: function() {            	

            },

            // Default values for all of the Model attributes
            defaults: {
            	day:1,
    			from:'',
    			via:'',
    			to:'',
    			breakfast:{
    				name:'',
    				telephone:'',
    				address:'',
    				city:'',
    				province:'',
    				payment:''
    			},
    			lunch:{
    				name:'',
    				telephone:'',
    				address:'',
    				city:'',
    				province:'',
    				payment:''
    			},
    			dinner:{
    				name:'',
    				telephone:'',
    				address:'',
    				city:'',
    				province:'',
    				payment:''
    			},
    			hotel:{
    				name:'',
    				telephone:'',
    				address:'',
    				city:'',
    				province:'',
    				payment:''
    			},    			
    			scenic:[{
    				name:'',
    				telephone:'',
    				address:'',
    				city:'',
    				province:'',
    				payment:''
    			}],
    			itinerary:''

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);