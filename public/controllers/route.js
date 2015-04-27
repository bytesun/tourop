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

	        newRoute: function(view,options){
	        	app.main.show(new CommonView({template:templates.route_info}));
	        },
	        startTour: function(){
	        	app.main.show(new CommonView({template:templates.tour_list}));
	        }



	};
});
