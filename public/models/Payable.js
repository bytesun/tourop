// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
       	   urlRoot: '/api/payable',
	       idAttribute: '_id',
            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {
                paytype:0,
                status:0,
                invoice:'',
                amount:0,
                tax:0,
                total:0,
                note:''
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);