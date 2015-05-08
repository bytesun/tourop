// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
  	       urlRoot: '/api/infos',
	       idAttribute: '_id',
	       defaults:{
	
	       },
            // Model Constructor
            initialize: function() {
            },

            // Default values for all of the Model attributes
            defaults: {
      	    	 type:"A",
    	    	 code:"",
    	    	 name:"Partner Information",
    	    	 payment:'CREC',//CREC,VOUC/CASH/CHEQ
    	    	 telphone:"", 
    	    	 fax:"",
    	    	 address:"",
    	    	 contact:"",
    	    	 city:"",
    	    	 province:"",
    	    	 country:"",
    	    	 postcode:"",
    	    	 note:""	
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);