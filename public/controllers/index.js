/*global define */

define([
	'app',
	'js-cookie',
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
	'models/User',
	
    'collections/Schedules',
    'collections/FareTypes',
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
    'views/ScheduleItemView',
    'views/ScheduleCollectionView',
    'views/TourScheduleItemView',
    'views/TourScheduleCollectionView',	
    'views/RouteFeeItemView',
    'views/RouteFeeCollectionView',	
	'views/GroupItemView',
    'views/GroupCollectionView',
    'views/BusItemView',
    'views/BusCollectionView',	
	'views/LoginView',

	'views/InfoLayout',
	'views/SettingView',
	'views/UserView'
], function (app,
		Cookie,
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
		User,
		
		Schedules,
		FareTypes,
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
		
		ScheduleItemView,
		ScheduleCollectionView,	
		TourScheduleItemView,
		TourScheduleCollectionView,	
		RouteFeeItemView,
		RouteFeeCollectionView,			
		GroupItemView,
		GroupCollectionView,
		BusItemView,
		BusCollectionView,		
		LoginView,
		InfoLayout,
		SettingView,
		UserView) {
	'use strict';

	return {
	      home : function(view,options){
	        	app.main.show(new HomeView());
	        },
	      user: function(){
	    	  var user = new User({
	    		  username:Cookie.get("user.uname"),
	    		  _id:Cookie.get("user.id"),
	    		  displayname:Cookie.get("user.displayname"),
	    		  email:Cookie.get("user.email")
	    	  });
	    	  app.main.show(new UserView({
	    		  model:user
	    	  }));
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
			        	
			        	tourCollectionView.on('childview:tour:showpassengersforguide',function(childview,tour){
			        		console.log('get tour info: ',JSON.stringify(tour));
			        		
			        		var passengerListView = new CommonView({
			        			template:templates.report_passenger_list4guide,
			        			model:tour
			        		});
			        		app.main.show(passengerListView);
			        	});
			        	tourCollectionView.on('childview:tour:showpassengersforhotel',function(childview,tour){
			        		console.log('get tour info: ',JSON.stringify(tour));
			        		
			        		var passengerListView = new CommonView({
			        			template:templates.report_passenger_list4hotel,
			        			model:tour
			        		});
			        		app.main.show(passengerListView);
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
	        			op:Cookie.get("user.displayname"),
	        			schedule:route.get("schedule")
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
	        		collection:groups,
	        		childViewOptions : function () { return { route: route }; },
	        		templateHelpers:function(){
	        			return {
	        				gn:groups.length,
	        				status:tour.get('status')
	        			}
	        		}
	        	});
//	        	groupCollectionView.on("childview:group:addagency",function(childview,group,agencycode){
//
//	            	var fetchingoitem = app.request("information:entity:fetch",agencycode);
//	            	$.when(fetchingoitem).done(function(item){
//	            		if(item!=null){
//	            			group.set({agency:item.toJSON()});
//	            		}   	      		
//	    	        	
//	            	});       	
//	        	});
	        	groupCollectionView.on("childview:group:confirm",function(childview,group){

	        		//save tour information before generating confirmation and invoice
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
	        			tourist:group.get("tourist"),
	        			tourcom:app.setting.get("tourcom")
	        			
	        		});
	        		console.log("save confirmation: "+JSON.stringify(cfm));
	        		cfm.save();
	        			        		
	        		//generate invoice
	        		var subtotal = 0;
	        		
	        		var tourists = group.get("tourist");
	        		var passengers = new Array();
	        		for(var i=0;i<tourists.length;i++){
	        			var fare = 0;
	        			for(var j=0;j<route.fare.length;j++){
	        				if(route.fare[j].name == tourists[i].fare){
	        					fare = route.fare[j].price;
	        					break;
	        				}
	        			}
	        			
	        			var meal = 0;
	        			for(var j=0;j<route.meal.length;j++){
	        				if(route.meal[j].name == tourists[i].meal){
	        					meal = route.meal[j].price;
	        					break;
	        				}
	        			}
	        			var admission = 0;
	        			for(var j=0;j<route.admission.length;j++){
	        				if(route.admission[j].name == tourists[i].admission){
	        					admission = route.admission[j].price;
	        					break;
	        				}
	        			}	        			
	        			//subtotal=subtotal+route[tourists[i].fare]+ route[tourists[i].admission]+route[tourists[i].meal];

	        			var commission = -(fare*(group.get("commission")/100));
	        			commission= Math.round(commission * 100) / 100;
	        			
	        			var adjustamount = -group.get('adjustamount');
	        			
	        			var amount = (fare+admission+meal+commission+adjustamount);
	        			amount= Math.round(amount * 100) / 100;
	        			subtotal = subtotal+amount;
	        			
	        			var passenger = {
	        					name:tourists[i].name,
	        					age:tourists[i].age,
	        					gender:tourists[i].gender,		
	        					roomtype:tourists[i].roomtype,
	        					phone:tourists[i].phone,
	        					faretype:'',
	        					fare:fare,
	        					admission:admission,
	        					meal:meal,
	        					commission:commission,
	        					adjustamount:adjustamount,
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
	        			tourist:passengers,
	        			tourcom:app.setting.get("tourcom")
	        			
	        		});
		        	console.log("save invoice: "+JSON.stringify(invoice));
		        	invoice.save();

		        	app.notify('','This group has been confirmed and the relative "Confirmation"/"Invoice" have been created!','alert-info');
	        	});
	        	

	        	
	        	//itinerary list
	        	var collection = new Schedules();
	        	collection.reset(tour.get("schedule"));        	

	        	var collectionView = new TourScheduleCollectionView({
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
	        		collection:buses,
	        		templateHelpers:function(){
	        			return {
	        				bn:buses.length,
	        				status:tour.get('status')
	        			}
	        		}
	        	});
	        	
	        	busCollectionView.on("childview:bus:addbuscom",function(childview,bus,agencycode){

	            	var fetchingoitems = app.request("entities:informations",{c:agencycode,t:'B'});
	            	$.when(fetchingoitems).done(function(items){
	            		if(items.length >= 1){
	            			var agency = items.at(0);
	            			bus.set({buscom:agency.toJSON()});

	            		}   	      		
	    	        	
	            	});       	
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
	        		tourView.scheduleRegion.show(collectionView);  
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
	        	var self = this;
	        	if(id == null){
	        		self._routeInfo(new RouteModel());
	        	}else{
		        	var fetchingRoute = app.request("route:entity",id);
					$.when(fetchingRoute).done(function(route){
						self._routeInfo(route);
					});
	        	}
	        	
	        },
	        _routeInfo: function(route){
	        	var routeView = new RouteInfoView({
	        		model: route
	        	});
	        	
	        	routeView.on("show",function(){
	            	//fee------------
	        		//fares
	        		var fares = new FareTypes();
	        		
		        	var loadFares = route.get("fare");
		        	console.log('loadFares is ',loadFares);
		        	if(loadFares != undefined && loadFares.length>0){
		        		fares.reset(loadFares);
		        	}
		        	
		        	var fareCollectionView = new RouteFeeCollectionView({
		        		collection:fares,
		        		templateHelpers:function(){
		        			return {
		        				fn:fares.length
		        			}
		        		}
		        	});
	            	this.faresRegion.show(fareCollectionView);
	            	//meal
	        		var meals = new FareTypes();
	        		
		        	var loadMeals = route.get("meal");
		        	console.log('loadMeals is ',loadMeals);
		        	if(loadMeals != undefined && loadMeals.length>0){
		        		meals.reset(loadMeals);
		        	}
		        	
		        	var mealCollectionView = new RouteFeeCollectionView({
		        		collection:meals,
		        		  childView: RouteFeeItemView.extend({
		        				template: templates.route_meal_item,
		        		  }),
		        		  childViewContainer: "#fare_meal_item",
		        		  template: templates.route_meal_list,
		        		templateHelpers:function(){
		        			return {
		        				mn:meals.length
		        			}
		        		}
		        	});
	            	this.mealsRegion.show(mealCollectionView);	            	
	            	//admission
	        		var adms = new FareTypes();
	        		
		        	var loadadms = route.get("admission");
		        	console.log('loadadms is ',loadadms);
		        	if(loadadms != undefined && loadadms.length>0){
		        		adms.reset(loadadms);
		        	}
		        	
		        	var admsCollectionView = new RouteFeeCollectionView({
		        		collection:adms,
		        		  childView: RouteFeeItemView.extend({
		        				template: templates.route_admission_item,
		        		  }),
		        		  childViewContainer: "#fare_admission_item",
		        		  template: templates.route_admission_list,
		        		templateHelpers:function(){
		        			return {
		        				an:adms.length
		        			}
		        		}
		        	});
	            	this.admissionsRegion.show(admsCollectionView);		            	
	            	
	            	//schedule
	        		var collection = new Schedules();
	            	collection.reset(this.model.get("schedule"));        	

	        		var collectionView = new ScheduleCollectionView({
	        			collection:collection
	        		});

	            	
	            	$("#days").val(collection.length);
	            	routeView.scheduleRegion.show(collectionView);
	        	});
	        	
	        	app.main.show(routeView);
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
	        		var invoiceView = new InvoiceInfoView({
		        		model: new InvoiceModel()
		        	});		        	
		        	app.main.show(invoiceView);
	        	}else{
		        	var fetchingItem = app.request("invoice:entity",id);
					$.when(fetchingItem).done(function(invoice){
						var invoiceView = new InvoiceInfoView({
			        		model: invoice
			        	});			        	
			        	app.main.show(invoiceView);
					});
	        	}	        	
	        	

	        },	 
	        setting: function(){

	        	var fetchingitem = app.request("setting:entity");
	        	$.when(fetchingitem).done(function(item){
	        		if(item !=null){
						var settingView = new SettingView({
			        		model: item
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
