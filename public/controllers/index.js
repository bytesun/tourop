/*global define */

define([
	'app',
	'templates',
	'views/CommonView',
	'views/HomeView',
	'views/TourView',
	'views/RouteView',
	'views/InfoCollectionView',
	'views/InfoAuthorView',
	'views/ConfirmationView',
	'views/InvoiceView',
	'views/TourInfoView',
	'views/LoginView',
	'models/Information',
	'collections/Informations',
	'layouts/InfoLayout'
], function (app,
		templates,
		CommonView,
		HomeView,
		TourView,
		RouteView,
		InfoCollectionView,
		InfoAuthorView,
		ConfirmationView,
		InvoiceView,
		TourInfoView,
		LoginView,
		InfoModel,
		InfoCollection,
		InfoLayout) {
	'use strict';

	return {
	      home : function(view,options){
	        	app.main.show(new HomeView());
	        },
	      tour : function(view,options){
	        	app.main.show(new TourView());
	        },	        
	        route : function(view,options){
	        	app.main.show(new RouteView());
	        },
	        tour_info: function(view,options){
	        	app.main.show(new TourInfoView());
	        },
	        tour_new: function(view,options){
	        	
	        	app.main.show(new CommonView({template:templates.tour_new}));
	        },
	        info : function(view,options){
	        	var infoLayout = new InfoLayout();
	        	var fetchingocases = app.request("entities:informations");
	        	$.when(fetchingocases).done(function(infos){
		        	var infoCollectionView = new InfoCollectionView({
		        		collection:infos
		        	});
		        	infoLayout.on("show",function(){	        		
		        		infoLayout.InfoListRegion.show(infoCollectionView);
		        		
		        	});
		        	app.main.show(infoLayout);
	        	});
	        },
	        info_info : function(view,options){
	        	var infoView = new InfoAuthorView({
	        		model : new InfoModel()
	        	}); 
	        	
	        	app.main.show(infoView);
	        },
	        info_new : function(view,options){
	        	var infoView = new InfoAuthorView({
	        		model : new InfoModel()
	        	}); 
	        	
	        	app.main.show(infoView);
	        },
	        confirmation : function(view,options){
	        	app.main.show(new ConfirmationView());
	        },
	        confirmation_info : function(view,options){
	        	app.main.show(new CommonView({template:templates.confirmation_info}));
	        },	        
	        invoice : function(view,options){
	        	app.main.show(new InvoiceView());
	        },
	        invoice_info: function(view,options){
	        	app.main.show(new CommonView({template:templates.invoice_info}));
	        },

	        logout: function(view,options){
	        	app.main.show(new LoginView());
	        }


	};
});
