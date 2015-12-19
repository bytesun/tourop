// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
       	   urlRoot: '/api/payable',
	       idAttribute: '_id',

            // Default values for all of the Model attributes
            defaults: {
                payee:'',
                payeecode:'',
                tour:'',
                tourcode:'',
                paytype:0,//0-voucher,1-cash,2-creditcard, 3-cheque...
                status:0,
                invoice:'',
                amount:0,
                tax:0,
                total:0,
                note:''
            },

            validate: function(attrs, options) {
            // 	console.log('valdate payable model code ');
            // 	if(attrs.payeecode == '' || attrs.payeecode == undefined){
            // 		return "payee code is required!";
            // 	}else  if(attrs.payeename == '' || attrs.payeename == undefined){
            // 		return "payee name is required!";
            // 	}

            }

        });

        // Returns the Model class
        return Model;

    }

);