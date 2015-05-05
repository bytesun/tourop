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
            	name : 'Route Information',
            	days: 1,
            	fee_tour_adult:0,
            	fee_tour_senior:0,
            	fee_tour_youth:0,
            	fee_tour_child:0,
            	fee_tour_infant:0,

            	fee_meal_adult:0,
            	fee_meal_senior:0,
            	fee_meal_youth:0,
            	fee_meal_child:0,
            	fee_meal_infant:0,

            	fee_adm_adult:0,
            	fee_adm_senior:0,
            	fee_adm_youth:0,
            	fee_adm_child:0,
            	fee_adm_infant:0,
            	itinerary:
            		[{
            			day:1,
            			from:'',
            			via:'',
            			to:'',
            			itinerary:''
            		}]	,
            	note : ''
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);