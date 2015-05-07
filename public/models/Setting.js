// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
   	       urlRoot: '/api/setting',
	       idAttribute: '_id',
            initialize: function() {            	

            },

            // Default values for all of the Model attributes
            defaults: {
            		name:'',
            		address:'',
            		city:'',
            		province:'',
            		country:'',
            		postcode:'',
            		phone:'',
            		fax:'',
            		email:'',
            		contact:'',
            		regno:'',
            	commission:0.1
            	
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);