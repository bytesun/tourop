define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
    'models/Passenger',
    'collections/Passengers',
    'collections/Itinerarys',
    'views/ItineraryItemView',
    'views/ItineraryCollectionView',
    'views/PassengerItemView',
    'views/PassengerCollectionView'
    
], function (Marionette, templates, _,
		Syphon,
		Passenger,
		Passengers,
		Itinerarys,
		ItineraryItemView,
		ItineraryCollectionView,
		PassengerItemView,
		PassengerCollectionView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.tour_info,
		regions:{
			passengerRegion:"#passenger_list_region",
			itineraryRegion:"#itinerary_list_region",
			busRegion:"#bus_list_region"
		},
        events: {
//            'change .route_code'	: 'fetchRoute',
            'click .btn_tour_save' : 'saveTour',
            'click .btn_tour_confirm' : 'confirmTour',
            'click .btn_tour_close' : 'closeTour'  
        },
        onShow: function(e){
        	//passenger list
        	var passengers = new Passengers(new Passenger());
        	var loadPassengers = this.model.get("passenger");
        	if(loadPassengers.length>0){

        		passengers.reset(loadPassengers);
        	}
        	
        	var passengerCollectionView = new PassengerCollectionView({
        		collection:passengers
        	});
        	this.passengerRegion.show(passengerCollectionView);
        	
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
//        fetchRoute:function(e){
//        	
//        	var inputstr = $(".route_code").val();
//        	var fetchingroutes = app.request("entities:routes",{c:inputstr});
//        	var tour = this.model;
//        	var collectionView = this.itineraryRegion.
//
//        	console.log('oritianl TOUR: '+JSON.stringify(this.model));
//        	$.when(fetchingroutes).done(function(routes){
//        		if(routes.length >= 1){
//        			var route = routes.at(0);
//        			console.log('fetch a route'+JSON.stringify(route));
//        			tour.set({
//        				routecode:route.get("code"),
//        				name:route.get("name"),
//        				days:route.get("days"),
//        				itinerary:route.get("itinerary")
//        				
//        			});
//        			//update itinerary collection 
//        			
//        		}
//        	});
//        	
//        },
        saveTour: function(e){
        	e.preventDefault();
          	
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);

    	    //save passenger data
    	    
    	    //save itinerary data
    	    var days=$("#days").val();
    	    var itinerary = new Array();
    	    for(var day=1;day<=days;day++){
    	    	//get itinerary string
    	    	var adm = "";
    	    	var index = 1;
    	    	while($("#adm"+day+"_"+index).val() != undefined ){
    	    		if(index == 1)
    	    			adm = $("#adm"+day+"_"+index).val();
    	    		else
    	    			adm = adm+"|"+$("#adm"+day+"_"+index).val();
    	    		index++;
    	    	}
    	    	console.log('adm is :'+adm);
    	    	itinerary[day-1]={
    	    			day:$("#day"+day).val(),
    	    			from:$("#from"+day).val(),
    	    			via:$("#via"+day).val(),
    	    			to:$("#to"+day).val(),
    	    			breakfast:$("#breakfast"+day).val(),
    	    			lunch:$("#lunch"+day).val(),
    	    			dinner:$("#dinner"+day).val(),
    	    			hotel:$("#hotel"+day).val(),
    	    			itinerary:adm

    	    	};
    	    	//remove duplicate fields
    	    	this.model.unset('day'+day);
    	    	this.model.unset('from'+day);
    	    	this.model.unset('via'+day);
    	    	this.model.unset('to'+day);
    	    	this.model.unset('adm_'+day);
    	    }
    	    this.model.set({'itinerary':itinerary});
    	    
    	    //save bus data
    	    
    	    
    	    console.log("ready to save data: "+JSON.stringify(this.model));
    	    this.model.save();

    	    app.navigate("tour/"+this.model.get("code"),true);         	

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
                title: 'Input memo information to close this tour',
                message: 'Input close information'
            },
            templates.tour_memo);
        }


	});
});
