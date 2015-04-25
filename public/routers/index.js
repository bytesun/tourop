/*global define */

define([
	'marionette'
], function (Marionette) {
	'use strict';

	return Marionette.AppRouter.extend({
		appRoutes: {
            "home" : "home",
            "tour":"tour_list",
            "route":"route_list",
            "agency":"agency_list",
            "hotel":"hotel_list",
            "restaurant":"restaurant_list",
            "voucher":"voucher_list",
            "invoice":"invoice_list",
            
            "tour_info":"tour_info"

		}
	});
});
