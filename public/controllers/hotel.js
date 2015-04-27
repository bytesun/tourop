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

	        newHotel: function(view,options){
	        	app.main.show(new CommonView({template:templates.hotel_info}));
	        },
	        editHotel: function(view,options){
	        	app.main.show(new CommonView({template:templates.hotel_info}));
	        },

	        searchHotel: function(){
	        	app.main.show(new CommonView({template:templates.hotel_list}));
	        }



	};
});
