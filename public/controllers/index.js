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
    'models/Invoice',
	'models/Information',
	'models/Setting',
	
    'collections/Itinerarys',
    'collections/Passengers',
    'collections/Groups',
    'collections/Buses', 
    'collections/Confirmations',
    'collections/Invoices',
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
	'views/InvoiceCollectionView',
	'views/InvoiceListItemView',
	'views/InvoiceInfoView',

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
		Invoice,
		InfoModel,
		Setting,
		
		Itinerarys,
		Passengers,
		Groups,
		Buses,	
		Confirmations,
		Invoices,
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
		InvoiceCollectionView,
		InvoiceListItemView,
		InvoiceInfoView,
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
	        		var issuedate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate());
	        		cfm.set({	        			
	        			no:tour.get("code")+group.get("no"),
	        			tourcode:tour.get("code"),
	        			groupno:group.get("no"),
	        			tourname:tour.get("name"),
	        			departuredate:tour.get("departuredate"),
	        			issuedate:issuedate,
	        			bookdate:group.get("bookdate"),
	        			op:tour.get("op"),
	        			pickup:group.get("pickup"),
	        			dropoff:group.get("dropoff"),
	        			
	        			agency:group.get("agency"),
	        			passenger:group.get("passenger")
	        			
	        		});
//	        		console.log("save confirmation: "+JSON.stringify(cfm));
	        		cfm.save();
	        		var subtotal = 0;
	        		
	        		var pgs = group.get("passenger");
	        		var passengers = new Array();
	        		for(var i=0;i<pgs.length;i++){
	        			var fare = 0;
	        			switch(pgs[i].fare){
	        			case 'Adult':
	        				fare = route.fee_tour_adult;
	        				break;
	        			case 'Senior':
	        				fare = route.fee_tour_senior;
	        				break;
	        			case 'Youth':
	        				fare = route.fee_tour_youth;
	        				break;
	        			case 'Child':
	        				fare = route.fee_tour_child;
	        				break;
	        			case 'Infant':
	        				fare = route.fee_tour_infant;
	        				break;
	        			}
	        			subtotal=subtotal+fare;
	        			
	        			var admission = 0;
	        			switch(pgs[i].admission){
	        			case 'Adult':
	        				admission = route.fee_adm_adult;
	        				break;
	        			case 'Senior':
	        				admission = route.fee_adm_senior;
	        				break;
	        			case 'Youth':
	        				admission = route.fee_adm_youth;
	        				break;
	        			case 'Child':
	        				admission = route.fee_adm_child;
	        				break;
	        			case 'Infant':
	        				admission = route.fee_adm_infant;
	        				break;
	        			}
	        			subtotal=subtotal+admission;
	        			
	        			var meal = 0;
	        			switch(pgs[i].meal){
	        			case 'Adult':
	        				meal = route.fee_meal_adult;
	        				break;
	        			case 'Senior':
	        				meal = route.fee_meal_senior;
	        				break;
	        			case 'Youth':
	        				meal = route.fee_meal_youth;
	        				break;
	        			case 'Child':
	        				meal = route.fee_meal_child;
	        				break;
	        			case 'Infant':
	        				meal = route.fee_meal_infant;
	        				break;
	        			}
	        			subtotal=subtotal+meal;
//	        			if(pgs.admission != 'No') faretype=faretype+"-"+
	        			var commission = -(fare*group.get("commission"));
	        			commission= Math.round(commission * 100) / 100;
	        			
	        			var amount = (fare+admission+meal+commission);
	        			amount= Math.round(amount * 100) / 100;
	        			subtotal=subtotal+commission;
	        			var passenger = {
	        					name:pgs[i].name,
	        					age:pgs[i].age,
	        					gender:pgs[i].gender,		
	        					roomtype:pgs[i].roomtype,
	        					phone:pgs[i].telephone,
	        					faretype:'',
	        					fee:fare,
	        					admission:admission,
	        					meal:meal,
	        					commission:commission,
	        					amount:amount
	        			}
	        			passengers[i]=passenger;
	        		}
	        		
	        		var tax = (subtotal*0.05);
	        		tax = Math.round(tax * 100) / 100;
	        		
	        		subtotal= Math.round(subtotal * 100) / 100;
	        		var total = (subtotal+tax);
	        		total= Math.round(total * 100) / 100;
	        		
		        	var invoice = new Invoice();
		        	invoice.set({	        			
	        			no:tour.get("code")+group.get("no"),
	        			tourcode:tour.get("code"),
	        			tourname:tour.get("name"),
	        			departuredate:tour.get("departuredate"),
	        			issuedate:issuedate,
	        			bookdate:group.get("bookdate"),
	        			op:tour.get("op"),
	        			taxable:subtotal,
	        	      	nontaxable:0,
	                	tax:tax,
	                	total:total,
	        			agency:group.get("agency"),
	        			passenger:passengers
	        			
	        		});
		        	console.log("save invoice: "+JSON.stringify(invoice));
		        	invoice.save();
	        		
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
	        invoice : function(code){
	        	var cfmView = new InvoiceView();
	        	
	        	
	        	if(code != null){
	        		var fetchingitems = app.request("entities:invoices",{c:code});
		        	$.when(fetchingitems).done(function(invoices){
		        		var cfmlistView=new InvoiceCollectionView({collection:invoices});
		        		cfmView.on("show",function(){
			        		cfmView.invoiceListRegion.show(cfmlistView);
			        	});
			        	app.main.show(cfmView);
		        	});	
	        	
	        	}else{
	        		var cfmlistView = new InvoiceCollectionView();
	        		cfmView.on("show",function(){
		        		cfmView.invoiceListRegion.show(cfmlistView);
		        	});
		        	app.main.show(cfmView);
	        	}
	        	
	        	
	        	
	        },
	        invoice_info : function(id){
	        	if(id == null){
	        		var cfmView = new InvoiceInfoView({
		        		model: new InvoiceModel()
		        	});		        	
		        	app.main.show(cfmView);
	        	}else{
		        	var fetchingItem = app.request("invoice:entity",id);
					$.when(fetchingItem).done(function(invoice){
						var cfmView = new InvoiceInfoView({
			        		model: invoice
			        	});			        	
			        	app.main.show(cfmView);
					});
	        	}	        	
	        	

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
