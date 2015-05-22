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
    			commission:20,
    			adjustamount:0,
    			route:{
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
    			tourist:[{
    				    no:1,
		    			name:'',
		    			gender:'',
		    			age:0,
		    			phone:'',
		    			fare:'',
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