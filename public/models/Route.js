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
            		no:1,
            		name:'',
            		price:0
            	}],
            	meal:[{
            		no:1,
            		name:'Adult',
            		price:0		
            	}],
            	admission:[{
            		no:1,
            		name:'Adult',
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
            				no:1,
            				name:'',
            				telphone:'',
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
            	if(attrs.code == '' || attrs.code == undefined){
            		return "route code is required!";
            	}else  if(attrs.name == '' || attrs.name == undefined){
            		return "route name is required!";
            	}
            }

        });

        // Returns the Model class
        return Model;

    }

);