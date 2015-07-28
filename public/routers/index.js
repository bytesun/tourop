/*global define */

define([
	'marionette',
	'views/LoginView'
], function (Marionette,LoginView) {
	'use strict';

	return Marionette.AppRouter.extend({
		appRoutes: {
            "home" : "home",
            "tour(/:query)":"tour",
            "tour_new/:routecode":"tour_new",
            "tour_info(/:tour_id)":"tour_info",
            "info(/:code/:type)":"info",
            "info_new":"info_new",
            "info_info":"info_info",
            "route(/:query)":"route",
            "route_info(/:id)":"route_info",            
            "confirmation(/:code)":"confirmation",
            "confirmation_info(/:id)":"confirmation_info",
            "invoice(/:tourcode)":"invoice",
            "invoice_info(/:id)":"invoice_info",
            "setting":"setting",
            "user":"user",
            "logout" : "logout",
            
            "report/tour/namelist4guide/:tour_id" : "report_tour_namelist4guide",
            "report/tour/namelist4hotel/:tour_id" : "report_tour_namelist4hotel",
            "report/tour/schedule/:tour_id" : "report_tour_schedule",

		}
	});
});
