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

	        newTour: function(view,options){
	        	app.main.show(new CommonView({template:templates.tour_info}));
	        }



	};
});
