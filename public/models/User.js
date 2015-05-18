/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
    "app"
], function(app){

    var UserModel = Backbone.Model.extend({
	       urlRoot: '/api/users',
	       idAttribute: '_id',
        initialize: function(){
//            _.bindAll(this);
        },

        defaults: {
        	
        	username: '',
        	email: '',
        	displayname: ''
        }

    });
    
    return UserModel;
});
