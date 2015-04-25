/*global define */

define(function (require) {
	'use strict';

	return {
		 home: require('tpl!templates/home-page.html'),
		 route: require('tpl!templates/route-list-page.html'),
		 agency: require('tpl!templates/agency-list-page.html'),
		 hotel: require('tpl!templates/hotel-list-page.html'),
		 restaurant: require('tpl!templates/restaurant-list-page.html'),
		 voucher: require('tpl!templates/voucher-list-page.html'),
		 invoice: require('tpl!templates/invoice-list-page.html'),
		 tour: require('tpl!templates/tour-list-page.html'),
		 
		 newTour:require('tpl!templates/tour-new-page.html'),
		 tour_info:require('tpl!templates/tour-info-page.html')
		 
	};
});

