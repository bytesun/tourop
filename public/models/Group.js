// Model.js
// --------
define(["app","jquery", "backbone"],

    function(app,$, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
            // Model Constructor
            initialize: function() {            	

            },

            // Default values for all of the Model attributes
            defaults: {
            	no:1,
            	status:'New',
    			bookdate:'',
    			pickup:'',	
    			dropoff:'',
    			agency:'',
    			commission:0.1,
    			passenger:[{
    				    no:1,
		    			name:'',
		    			gender:'',
		    			age:0,
		    			phone:'',
		    			fee:'',
		    			meal:'',
		    			admission:'',
		    			roomtype:''
    			}]
//            	
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);