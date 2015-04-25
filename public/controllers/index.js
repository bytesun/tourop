/*global define */

define([
	'app',
	'templates',
	'views/CommonView',
	'views/HomeView',
	'views/TourView',
	'views/RouteView',
	'views/AgencyView',
	'views/HotelView',
	'views/RestaurantView',
	'views/VoucherView',
	'views/InvoiceView',
	'views/TourInfoView',
	'views/LoginView'
], function (app,
		templates,
		CommonView,
		HomeView,TourView,RouteView,AgencyView,HotelView,RestaurantView,
		VoucherView,
		InvoiceView,
		TourInfoView,
		LoginView) {
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
	        voucher_info : function(view,options){
	        	app.main.show(new CommonView({template:templates.voucher_info}));
	        },	        
	        invoice_list : function(view,options){
	        	app.main.show(new InvoiceView());
	        },
	        tour_info: function(view,options){
	        	app.main.show(new TourInfoView());
	        },
	        logout: function(view,options){
	        	app.main.show(new LoginView());
	        }


	};
});
