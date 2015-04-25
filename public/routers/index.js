/*global define */

define([
	'marionette'
], function (Marionette) {
	'use strict';

	return Marionette.AppRouter.extend({
		appRoutes: {
            "home" : "home",
            "tourlist":"tour_list",
            "route_list":"route_list",
            "agency_list":"agency_list",
            "hotel_list":"hotel_list",
            "restaurant_list":"restaurant_list",
            "voucher_list":"voucher_list",
            "voucher_info":"voucher_info",
            "invoice_list":"invoice_list",
            
            "tour_info":"tour_info",
            
            
            "logout" : "logout"

		}
	});
});
