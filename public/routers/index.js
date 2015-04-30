/*global define */

define([
	'marionette',
	'views/LoginView'
], function (Marionette,LoginView) {
	'use strict';

	return Marionette.AppRouter.extend({
		appRoutes: {
            "home" : "home",
            "tour":"tour",
            "info(/:code/:type)":"info",
            "info_new":"info_new",
            "info_info":"info_info",
            "route(/:query)":"route",
            "route_info/:id":"route_info",            
            "confirmation":"confirmation",
            "confirmation_info":"confirmation_info",
            "invoice":"invoice",
            "invoice_info":"invoice_info",
            "tour_info/:tour_id":"tour_info",            
            "tour_new":"tour_new",
            
            "logout" : "logout"

		}
	});
});
