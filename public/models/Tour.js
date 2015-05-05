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
        		routecode:'',
        		code:'',
        		name:'Tour Information',
        		op:'',
        		guide:'',
        		departuredate:'',
        		days:'',
        		passenger:[{
        			group:1,
        			name:'',
        			gender:'',
        			age:0,
        			phone:'',
        			meal:false,
        			admission:false,
        			pickup:'',	
        			confirmation:'',
        			invoice:'',
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
        		}],
        		bus:[],
        		note:''
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);