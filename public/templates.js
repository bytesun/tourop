/*global define */

define(function (require) {
	'use strict';

	return {
		 login:require('tpl!templates/login-page.html'),
		 home: require('tpl!templates/home-page.html'),
		 user_profile: require('tpl!templates/user-profile-page.html'),
		 user_info: require('tpl!templates/user-info-page.html'),
		 user: require('tpl!templates/user-page.html'),
		 user_list: require('tpl!templates/user-list-page.html'),
		 user_item: require('tpl!templates/user-item-page.html'),
		 
		 tour: require('tpl!templates/tour-page.html'),
		 tour_info:require('tpl!templates/tour-info-page.html'),
		 tour_memo:require('tpl!templates/tour-memo-page.html'),
		 tour_list: require('tpl!templates/tour-list-page.html'),
		 tour_item: require('tpl!templates/tour-item-page.html'),		
		 tour_schedule_list: require('tpl!templates/tour-schedule-list-page.html'),
		 tour_schedule_item: require('tpl!templates/tour-schedule-item-page.html'),
		 tour_group_item:require('tpl!templates/group-item-page.html'),
		 tour_group_list:require('tpl!templates/group-list-page.html'),
		 tour_tourist_item:require('tpl!templates/tourist-item-page.html'),
		 tour_tourist_list:require('tpl!templates/tourist-list-page.html'),

		 
		 tour_bus_item:require('tpl!templates/bus-item-page.html'),
		 tour_bus_list:require('tpl!templates/bus-list-page.html'),
		 
		 route: require('tpl!templates/route-page.html'),
		 route_info: require('tpl!templates/route-info-page.html'),
		 route_list: require('tpl!templates/route-list-page.html'),
		 route_item: require('tpl!templates/route-item-page.html'),		 
		 route_faretype_list: require('tpl!templates/route-faretype-list-page.html'),
		 route_faretype_item: require('tpl!templates/route-faretype-item-page.html'),
		 route_meal_list: require('tpl!templates/route-meal-list-page.html'),
		 route_meal_item: require('tpl!templates/route-meal-item-page.html'),		 
		 route_admission_list: require('tpl!templates/route-admission-list-page.html'),
		 route_admission_item: require('tpl!templates/route-admission-item-page.html'),		 
		 route_schedule_list: require('tpl!templates/route-schedule-list-page.html'),
		 route_schedule_item: require('tpl!templates/route-schedule-item-page.html'),
		 
		 info: require('tpl!templates/information-page.html'),
		 info_list: require('tpl!templates/information-list-page.html'),
		 info_item: require('tpl!templates/information-item-page.html'),
		 info_info: require('tpl!templates/information-info-page.html'),
		 confirmation: require('tpl!templates/confirmation-page.html'),
		 confirmation_list: require('tpl!templates/confirmation-list-page.html'),
		 confirmation_item: require('tpl!templates/confirmation-item-page.html'),
		 confirmation_info: require('tpl!templates/confirmation-info-page.html'),
		 invoice: require('tpl!templates/invoice-page.html'),
		 invoice_list: require('tpl!templates/invoice-list-page.html'),
		 invoice_item: require('tpl!templates/invoice-item-page.html'),
		 invoice_info: require('tpl!templates/invoice-info-page.html'),

		 payable: require('tpl!templates/payable-page.html'),
		 payable_list: require('tpl!templates/payable-list-page.html'),
		 payable_item: require('tpl!templates/payable-item-page.html'),
		 payable_info: require('tpl!templates/payable-info-page.html'),
		 
		 partner_list_scenic: require('tpl!templates/partner-list-scenic-page.html'),
		 partner_item_scenic: require('tpl!templates/partner-item-scenic-page.html'),
		 report_passenger_list4guide: require('tpl!templates/report-passenger-list-forguide-page.html'),
		 report_passenger_list4hotel: require('tpl!templates/report-passenger-list-forhotel-page.html'),
		 report_tour_schedule : require('tpl!templates/report-tour-schedule-page.html'),

		 
		 setting:require('tpl!templates/setting-page.html'),
		 common: require('tpl!templates/common-page.html')
		 
	};
});

