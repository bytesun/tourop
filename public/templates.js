/*global define */

define(function (require) {
	'use strict';

	return {
		 login:require('tpl!templates/login-page.html'),
		 home: require('tpl!templates/home-page.html'),
		 route_list: require('tpl!templates/route-list-page.html'),
		 agency_list: require('tpl!templates/agency-list-page.html'),
		 hotel_list: require('tpl!templates/hotel-list-page.html'),
		 restaurant_list: require('tpl!templates/restaurant-list-page.html'),
		 voucher_list: require('tpl!templates/voucher-list-page.html'),
		 voucher_info: require('tpl!templates/voucher-info-page.html'),
		 invoice_list: require('tpl!templates/invoice-list-page.html'),
		 tour_list: require('tpl!templates/tour-list-page.html'),
		 
		 tour_new:require('tpl!templates/tour-new-page.html'),
		 tour_info:require('tpl!templates/tour-info-page.html'),
		 
		 common: require('tpl!templates/common-page.html')
		 
	};
});

