/*global define */

define([
	'app',
	'views/HomeView',
	'views/TourView',
	'views/RouteView',
	'views/AgencyView',
	'views/HotelView',
	'views/RestaurantView',
	'views/VoucherView',
	'views/InvoiceView',
	'views/TourInfoView'
], function (app,HomeView,TourView,RouteView,AgencyView,HotelView,RestaurantView,
		VoucherView,InvoiceView,
		TourInfoView) {
	'use strict';

	return {
	      home : function(view,options){
	        	app.main.show(new HomeView());
	        },
	      tour_list : function(view,options){
	        	app.main.show(new TourView());
	        },	        
	        route_list : function(view,options){
	        	app.main.show(new RouteView());
	        },
	        agency_list : function(view,options){
	        	app.main.show(new AgencyView());
	        },
	        hotel_list : function(view,options){
	        	app.main.show(new HotelView());
	        },
	        restaurant_list : function(view,options){
	        	app.main.show(new RestaurantView());
	        },
	        voucher_list : function(view,options){
	        	app.main.show(new VoucherView());
	        },
	        invoice_list : function(view,options){
	        	app.main.show(new InvoiceView());
	        },
	        tour_info: function(view,options){
	        	app.main.show(new TourInfoView());
	        }


	};
});
