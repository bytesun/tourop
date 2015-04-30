/*global define */

define([
	'app',
	'templates',
	'views/CommonView',
	'views/HomeView',
	'views/TourView',
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
	        route : function(query){
	        	console.log("query :"+query);
//	        	if(query == undefined)query=0;
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
	        	console.log('show route info view'+id);
	        	var fetchingRoute = app.request("route:entity",id);
				$.when(fetchingRoute).done(function(route){
					var routeView = new RouteInfoView({
		        		model: route
		        	});
		        	
		        	app.main.show(routeView);
				});
	        	
	        },
	        tour_info: function(view,options){
	        	app.main.show(new TourInfoView());
	        },
	        tour_new: function(view,options){
	        	
	        	app.main.show(new CommonView({template:templates.tour_new}));
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
	        		model : new InfoModel({
	       	    	 type:"A",
	    	    	 code:"",
	    	    	 name:"",
	    	    	 telphone:"",
	    	    	 address:"",
	    	    	 contact:"",
	    	    	 city:"",
	    	    	 province:"",
	    	    	 country:"",
	    	    	 postcode:"",
	    	    	 note:""
	        		})
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
