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
            	no:1,
//       			group:1,
    			name:'',
    			gender:'',
    			age:0,
    			phone:'',
    			fee:'',
    			meal:'',
    			admission:'',
    			roomtype:'',
//    			bookdate:'',
//    			pickup:'',	
//    			dropoff:'',
//    			agency:''
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