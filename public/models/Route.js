// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
   	       urlRoot: '/api/routes',
	       idAttribute: '_id',
            // Model Constructor
            initialize: function() {            	
             },

            // Default values for all of the Model attributes
            defaults: {
            	code : '',
            	name : '',
            	days: 1,
            	fare:[{
            		name:'',
            		price:0
            	},
            	{
            		name:'',
            		price:0
            	},
            	{
            		name:'',
            		price:0
            	},
            	{
            		name:'',
            		price:0
            	},
            	{
            		name:'',
            		price:0
            	}],
            	meal:[{
            		name:'Adult',
            		price:0		
            	},
            	{
            		name:'Senior',
            		price:0		
            	},
            	{
            		name:'Youth',
            		price:0		
            	},
            	{
            		name:'Child',
            		price:0		
            	},
            	{
            		name:'Infant',
            		price:0		
            	}],
            	admission:[{
            		name:'Adult',
            		price:0		
            	},
            	{
            		name:'Senior',
            		price:0		
            	},
            	{
            		name:'Youth',
            		price:0		
            	},
            	{
            		name:'Child',
            		price:0		
            	},
            	{
            		name:'Infant',
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

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);