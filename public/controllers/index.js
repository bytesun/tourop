/*global define */

define([
	'app',
	'templates',
	'models/Route',
	'models/Tour',
    'models/Passenger',
    'models/Group',
    'models/Bus',
    'models/Confirmation',
	'models/Information',
	'models/Setting',
	
    'collections/Itinerarys',
    'collections/Passengers',
    'collections/Groups',
    'collections/Buses', 
    'collections/Confirmations',
	'collections/Informations',
	
	'views/CommonView',
	'views/HomeView',
	'views/TourView',
	'views/TourCollectionView',    
	'views/RouteView',
	'views/RouteInfoView',
	'views/RouteCollectionView',

	'views/InfoCollectionView',
	'views/InfoAuthorView',
	'views/ConfirmationView',
	'views/ConfirmationCollectionView',
	'views/ConfirmationListItemView',
	'views/ConfirmationInfoView',
	'views/InvoiceView',
	'views/TourInfoView',

    'views/ItineraryItemView',
    'views/ItineraryCollectionView',	
	'views/GroupItemView',
    'views/GroupCollectionView',
    'views/BusItemView',
    'views/BusCollectionView',	
	'views/LoginView',

	'views/InfoLayout',
	'views/SettingView'
], function (app,
		templates,
		RouteModel,
		TourModel,
		Passenger,
		Group,
		Bus,
		Confirmation,
		InfoModel,
		Setting,
		
		Itinerarys,
		Passengers,
		Groups,
		Buses,	
		Confirmations,
		InfoCollection,
		
		CommonView,
		HomeView,
		TourView,
		TourCollectionView,		
		RouteView,
		RouteInfoView,
		RouteCollectionView,

		InfoCollectionView,
		InfoAuthorView,
		ConfirmationView,
		ConfirmationCollectionView,
		ConfirmationListItemView,
		ConfirmationInfoView,
		InvoiceView,
		TourInfoView,
		ItineraryItemView,
		ItineraryCollectionView,		
		GroupItemView,
		GroupCollectionView,
		BusItemView,
		BusCollectionView,		
		LoginView,
		InfoLayout,
		SettingView) {
	'use strict';

	return {
	      home : function(view,options){
	        	app.main.show(new HomeView());
	        },
	      tour : function(query){

	        	var tourView = new TourView({
	        		model:new TourModel()
	        	});
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
	        	
	        	
	        },	    
	        tour_info: function(id){
	        	var tour = new TourModel();
	           	if(id != null){
	           		var self = this;
		        	var fetchingTour = app.request("tour:entity",id);
					$.when(fetchingTour).done(function(tour){
						self.tour_show(tour);
					});
	        	}else{
	        		this.tour_show(tour);	
	        	}
	        },
	        tour_new: function(routeid){
	        	var fetchingRoute = app.request("route:entity",routeid);
	        	var self = this;
				$.when(fetchingRoute).done(function(route){
					var tour = new TourModel({
	        			route:route.toJSON(),
	        			name:route.get("name"),
	        			days:route.get("days"),
	        			itinerary:route.get("itinerary")
	        		});

					self.tour_show(tour);
				});

	        },
	        //common function
	        tour_show: function(tour){
	        	var route = tour.get("route");//get route information for next fare calculation
	        	var tourView = new TourInfoView({
	        		model: tour
	        	})

	        	//get group list
	           	var groups = new Groups(new Group());
	        	var loadGroups = tour.get("group");
	        	console.log('loadGroups is ',loadGroups);
	        	if(loadGroups != undefined && loadGroups.length>0){
	        		groups.reset(loadGroups);
	        	}
	        	
	        	var groupCollectionView = new GroupCollectionView({
	        		collection:groups
	        	});
	        	groupCollectionView.on("childview:group:addagency",function(childview,group,agencycode){

	            	var fetchingoitems = app.request("entities:informations",{c:agencycode,t:'A'});
	            	$.when(fetchingoitems).done(function(items){
	            		if(items.length >= 1){
	            			var agency = items.at(0);
	            			group.set({agency:agency.toJSON()});
	            		}   	      		
	    	        	
	            	});       	
	        	});
	        	groupCollectionView.on("childview:group:confirm",function(childview,group){
	        		app.execute("tour:save");
	        		
	        		//generate confirmation and invoice

	        		var cfm = new Confirmation();
	        		var date=new Date();
	        		cfm.set({	        			
	        			no:tour.get("code")+group.get("no"),
	        			tourcode:tour.get("code"),
	        			groupno:group.get("no"),
	        			tourname:tour.get("name"),
	        			departuredate:tour.get("departuredate"),
	        			issuedate:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()),
	        			bookdate:group.get("bookdate"),
	        			op:tour.get("op"),
	        			pickup:group.get("pickup"),
	        			dropoff:group.get("dropoff"),
	        			
	        			agency:group.get("agency"),
	        			passenger:group.get("passenger")
	        			
	        		});
	        		console.log("save confirmation: "+JSON.stringify(cfm));
	        		cfm.save();
	        	});
	        	
	        	//itinerary list
	        	var collection = new Itinerarys();
	        	collection.reset(tour.get("itinerary"));        	

	        	var collectionView = new ItineraryCollectionView({
	        		template:templates.tour_itinerary_list,
	        		childView:ItineraryItemView.extend({
	        			template: templates.tour_itinerary_item,
	        		}),
	    			collection:collection
	    		});
	        	
	        	//bus list
	        	var buses = new Buses(new Bus());
	        	var loadBuses = tour.get("bus");
	        	console.log('loadbuses is ',loadBuses);
	        	if(loadBuses != undefined && loadBuses.length>0){
	        		buses.reset(loadBuses);
	        	}
	        	
	        	var busCollectionView = new BusCollectionView({
	        		collection:buses
	        	});
	        	
	        	
	        	tourView.on("tour:save",function(){
	        		console.log('groups is '+JSON.stringify(groups));
//	        		tour.set({
//	        			group:groups.toJSON()
//	        		});
	        		console.log('tour is '+JSON.stringify(tour));
	        		tour.save();
	        	});
	        	//showing page with regions
	        	tourView.on("show",function(){
	        		tourView.groupRegion.show(groupCollectionView);  
	        		tourView.itineraryRegion.show(collectionView);  
	        		tourView.busRegion.show(busCollectionView); 
	        	});
	        	app.main.show(tourView);
	        },
	        route : function(code){

	        	var routeView = new RouteView({
	        		model:new RouteModel()
	        	});
	        	if(code == null){
		        	var routeCollectionView = new RouteCollectionView({
		        		collection:null
		        	});
		        	routeView.on("show",function(){	        		
		        		routeView.routeListRegion.show(routeCollectionView);
		        		
		        	});	        		
	        		app.main.show(routeView);
	        	}else{
	        		var fetchingitems = app.request("entities:routes",{c:code});
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
	        confirmation : function(code){
	        	var cfmView = new ConfirmationView();
	        	
	        	
	        	if(code != null){
	        		var fetchingitems = app.request("entities:confirmations",{c:code});
		        	$.when(fetchingitems).done(function(confirmations){
		        		var cfmlistView=new ConfirmationCollectionView({collection:confirmations});
		        		cfmView.on("show",function(){
			        		cfmView.confirmationListRegion.show(cfmlistView);
			        	});
			        	app.main.show(cfmView);
		        	});	
	        	
	        	}else{
	        		var cfmlistView = new ConfirmationCollectionView();
	        		cfmView.on("show",function(){
		        		cfmView.confirmationListRegion.show(cfmlistView);
		        	});
		        	app.main.show(cfmView);
	        	}
	        	
	        	
	        	
	        },
	        confirmation_info : function(id){
	        	if(id == null){
	        		var cfmView = new ConfirmationInfoView({
		        		model: new ConfirmationModel()
		        	});		        	
		        	app.main.show(cfmView);
	        	}else{
		        	var fetchingItem = app.request("confirmation:entity",id);
					$.when(fetchingItem).done(function(confirmation){
						var cfmView = new ConfirmationInfoView({
			        		model: confirmation
			        	});			        	
			        	app.main.show(cfmView);
					});
	        	}	        	
	        	

	        },	        
	        invoice : function(view,options){
	        	app.main.show(new InvoiceView());
	        },
	        invoice_info: function(view,options){
	        	app.main.show(new CommonView({template:templates.invoice_info}));
	        },
	        setting: function(){
	        	var fetchingitems = app.request("entities:settings");
	        	$.when(fetchingitems).done(function(items){
	        		if(items.length>0){
						var settingView = new SettingView({
			        		model: items.at(0)
			        	});			        	
			        	app.main.show(settingView);
	        		}else{
						var settingView = new SettingView({
			        		model: new Setting()
			        	});			        	
			        	app.main.show(settingView);
	        		}
	        	});	        	
        	
	        },
	        logout: function(view,options){
	        	app.main.show(new LoginView());
	        }


	};
});
