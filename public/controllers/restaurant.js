/*global define */

define([
	'app',
	'templates',
	'views/CommonView'
], function (app,
		templates,
		CommonView
		) {
	'use strict';

	return {

	        newRestaurant: function(view,options){
	        	app.main.show(new CommonView({template:templates.restaurant_info}));
	        },
	        editRestaurant: function(view,options){
	        	app.main.show(new CommonView({template:templates.restaurant_info}));
	        },

	        searchRestaurant: function(){
	        	app.main.show(new CommonView({template:templates.restaurant_list}));
	        }



	};
});
