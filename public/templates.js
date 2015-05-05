/*global define */

define(function (require) {
	'use strict';

	return {
		 login:require('tpl!templates/login-page.html'),
		 home: require('tpl!templates/home-page.html'),
		 tour_info:require('tpl!templates/tour-info-page.html'),
		 tour_memo:require('tpl!templates/tour-memo-page.html'),
		 tour_list: require('tpl!templates/tour-list-page.html'),		 
		 tour_itinerary_list: require('tpl!templates/tour-itinerary-list-page.html'),
		 tour_itinerary_item: require('tpl!templates/tour-itinerary-item-page.html'),
		 passenger_item:require('tpl!templates/passenger-item-page.html'),
		 passenger_list:require('tpl!templates/passenger-list-page.html'),
		 bus_item:require('tpl!templates/bus-item-page.html'),
		 bus_list:require('tpl!templates/bus-list-page.html'),
		 route: require('tpl!templates/route-page.html'),
		 route_info: require('tpl!templates/route-info-page.html'),
		 route_list: require('tpl!templates/route-list-page.html'),
		 route_item: require('tpl!templates/route-item-page.html'),		 
		 route_itinerary_list: require('tpl!templates/route-itinerary-list-page.html'),
		 route_itinerary_item: require('tpl!templates/route-itinerary-item-page.html'),
		 info: require('tpl!templates/information-page.html'),
		 info_list: require('tpl!templates/information-list-page.html'),
		 info_item: require('tpl!templates/information-item-page.html'),
		 info_info: require('tpl!templates/information-info-page.html'),
		 confirmation_list: require('tpl!templates/confirmation-list-page.html'),
		 confirmation_info: require('tpl!templates/confirmation-info-page.html'),
		 invoice_list: require('tpl!templates/invoice-list-page.html'),
		 invoice_info: require('tpl!templates/invoice-info-page.html'),
		 

		 common: require('tpl!templates/common-page.html')
		 
	};
});

