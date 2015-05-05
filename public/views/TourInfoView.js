define([
	'marionette',
	'templates',
    'underscore',
    'collections/Itinerarys',
    'views/ItineraryItemView',
    'views/ItineraryCollectionView'
], function (Marionette, templates, _,
		Itinerarys,
		ItineraryItemView,
		ItineraryCollectionView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.tour_info,
		regions:{
			passengerRegion:"#passenger_list_region",
			itineraryRegion:"#itinerary_list_region",
			busRegion:"#bus_list_region"
		},
		   initialize: function () {
//		        _.bindAll(this,this.render);		   
//		        this.model.bind('change', this.render);
//		        this.model.bind('change', _.bind(this.render, this));
		    },
        events: {
//            'change .route_code'	: 'fetchRoute',
            'click .btn_tour_save' : 'saveTour',
            'click .btn_tour_confirm' : 'confirmTour',
            'click .btn_tour_close' : 'closeTour'  
        },
        onShow: function(e){
        	//passenger list
        	
        	//itinerary list
        	var collection = new Itinerarys();
        	collection.reset(this.model.get("itinerary"));        	

        	var collectionView = new ItineraryCollectionView({
        		template:templates.tour_itinerary_list,
        		childView:ItineraryItemView.extend({
        			template: templates.tour_itinerary_item,
        		}),
    			collection:collection
    		});
        	
        	this.itineraryRegion.show(collectionView);        	
        	//bus list
        	
        	
        },
        fetchRoute:function(e){
        	
        	var inputstr = $(".route_code").val();
        	var fetchingroutes = app.request("entities:routes",{c:inputstr});
        	var tour = this.model;
        	var collectionView = this.itineraryRegion.

        	console.log('oritianl TOUR: '+JSON.stringify(this.model));
        	$.when(fetchingroutes).done(function(routes){
        		if(routes.length >= 1){
        			var route = routes.at(0);
        			console.log('fetch a route'+JSON.stringify(route));
        			tour.set({
        				routecode:route.get("code"),
        				name:route.get("name"),
        				days:route.get("days"),
        				itinerary:route.get("itinerary")
        				
        			});
        			//update itinerary collection 
        			
        		}
        	});
        	
        },
        saveTour: function(e){
        	app.execute("app:notify",{
        		title:'',
        		description : 'All information has been saved!'
        	});

        },
        confirmTour: function(e){
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure all information are correct?'
        	});
        },        
        closeTour: function(e){
        	console.log('close tour');
        	app.request("app:dialog:simple", {
                title: 'Input memo information to close this tour', // Optional
                message: 'Input close information'
            },
            templates.tour_memo);
        }

	});
});
