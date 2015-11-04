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
                 _id:'',
            	 no:1,
    	    	 code:"",
    	    	 name:"",
    	    	 name_cn:"",
    	    	 payment:'',//CREC,VOUC/CASH/CHEQ
    	    	 telphone:"", 
    	    	 fax:"",
    	    	 contact:"",
    	    	 cellphone:"",
    	    	 email:"",
    	    	 address:"",    	    	 
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