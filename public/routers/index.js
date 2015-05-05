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
            "tour_new/:routecode":"tour_new",
            "tour_info(/:tour_id)":"tour_info",
            "info(/:code/:type)":"info",
            "info_new":"info_new",
            "info_info":"info_info",
            "route(/:query)":"route",
            "route_info(/:id)":"route_info",            
            //"route_itinerary(/:id)":"route_itinerary",
            "confirmation":"confirmation",
            "confirmation_info":"confirmation_info",
            "invoice":"invoice",
            "invoice_info":"invoice_info",            
            
            "logout" : "logout"

		}
	});
});
