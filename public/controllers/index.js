/*global define */

define([
	'app',
	'templates',
	'views/CommonView',
	'views/HomeView',
	'views/TourView',
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
	      tour : function(view,options){
	        	app.main.show(new TourView());
	        },	    
	        tour_info: function(id){
	        	 
	        	if(id == null){
	        		app.main.show(new TourInfoView({
		        		model: new TourModel()
		        	}));
	        	}else{
	        		//fetch tour information
	        	}
	        	
	        },
	        
	        route : function(query){
	        	console.log("query :"+query);

	        	var routeView = new RouteView({
	        		model:new RouteModel({
	        			code:"",
	        			name:"",
	        			days:1
	        		})
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
	        route_itinerary: function(id){
	        	console.log('list itinerary for route :'+id);
	        	var routeItineraryView = new RouteItinerary();        	
	        	
	        	app.main.show(routeItineraryView);
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
