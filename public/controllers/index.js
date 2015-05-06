/*global define */

define([
	'app',
	'templates',
	'views/CommonView',
	'views/HomeView',
	'views/TourView',
	'views/TourCollectionView',
	'models/Tour',
	'views/RouteView',
	'views/RouteInfoView',
	'views/RouteCollectionView',
	'models/Route',
	'views/InfoCollectionView',
	'views/InfoAuthorView',
	'views/ConfirmationView',
	'views/InvoiceView',
	'views/TourInfoView',
	'views/LoginView',
	'models/Information',
	'collections/Informations',
	'views/InfoLayout'
], function (app,
		templates,
		CommonView,
		HomeView,
		TourView,
		TourCollectionView,
		TourModel,
		RouteView,
		RouteInfoView,
		RouteCollectionView,
		RouteModel,
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
	      tour : function(query){

	        	var tourView = new TourView({
	        		model:new TourModel()
	        	});
	        	if(query == null){
		        	var tourCollectionView = new TourCollectionView({
		        		collection:null
		        	});
		        	tourView.on("show",function(){	        		
		        		tourView.tourListRegion.show(tourCollectionView);
		        		
		        	});	        		
	        		app.main.show(tourView);
	        	}else{
	        		var fetchingitems = app.request("entities:tours",{c:query});
		        	$.when(fetchingitems).done(function(tours){
		        			        		
			        	var tourCollectionView = new TourCollectionView({
			        		collection:tours
			        	});
			        	tourView.on("show",function(){	        		
			        		tourView.tourListRegion.show(tourCollectionView);
			        		
			        	});
			        	app.main.show(tourView);
		        	});	
	        	
	        	}   
	        	
	        },	    
	        tour_info: function(id){
	           	if(id == null){
	        		var tourView = new TourInfoView({
		        		model: new TourModel()
		        	});		        	
		        	app.main.show(tourView);
	        	}else{
		        	var fetchingTour = app.request("tour:entity",id);
					$.when(fetchingTour).done(function(tour){
						
						var tourView = new TourInfoView({
			        		model: tour
			        	});			        	
			        	app.main.show(tourView);
					});
	        	}
	        	
	        },
	        tour_new: function(routecode){

	        	var fetchingroutes = app.request("entities:routes",{c:routecode});
	        	$.when(fetchingroutes).done(function(routes){
	        		if(routes.length >= 1){
	        			var route = routes.at(0);
		        		app.main.show(new TourInfoView({
			        		model: new TourModel({
			        			routecode:route.get("code"),
		        				name:route.get("name"),
		        				days:route.get("days"),
		        				itinerary:route.get("itinerary")
			        		})
			        	}));
	        			
	        		}
	        	});
	        },
	        route : function(query){

	        	var routeView = new RouteView({
	        		model:new RouteModel()
	        	});
	        	if(query == null){
		        	var routeCollectionView = new RouteCollectionView({
		        		collection:null
		        	});
		        	routeView.on("show",function(){	        		
		        		routeView.routeListRegion.show(routeCollectionView);
		        		
		        	});	        		
	        		app.main.show(routeView);
	        	}else{
	        		var fetchingitems = app.request("entities:routes",{c:query});
		        	$.when(fetchingitems).done(function(routes){
		        			        		
			        	var routeCollectionView = new RouteCollectionView({
			        		collection:routes
			        	});
			        	routeView.on("show",function(){	        		
			        		routeView.routeListRegion.show(routeCollectionView);
			        		
			        	});
			        	app.main.show(routeView);
		        	});	
	        	
	        	}   
	        	
	        },
	        route_info : function(id){
	        	if(id == null){
	        		var routeView = new RouteInfoView({
		        		model: new RouteModel()
		        	});		        	
		        	app.main.show(routeView);
	        	}else{
		        	var fetchingRoute = app.request("route:entity",id);
					$.when(fetchingRoute).done(function(route){
						var routeView = new RouteInfoView({
			        		model: route
			        	});			        	
			        	app.main.show(routeView);
					});
	        	}
	        	
	        },
	        info : function(code,type){
	        	console.log('code:type:'+code+":"+type);
	        	
	        	var infoLayout = new InfoLayout();
	        	var fetchingocases = app.request("entities:informations",{c:code,t:type});
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
