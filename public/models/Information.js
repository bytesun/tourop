// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
  	       urlRoot: '/api/partner',
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
    	    	 name:"",
    	    	 name_cn:"",
    	    	 payment:'CREC',//CREC,VOUC/CASH/CHEQ
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
            	if(attrs.code == '' || attrs.code == undefined){
            		return "partner code is required!";
            	}else  if(attrs.name == '' || attrs.name == undefined){
            		return "partner name is required!";
            	}
            }

        });

        // Returns the Model class
        return Model;

    }

);