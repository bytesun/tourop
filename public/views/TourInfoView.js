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

            'click .btn_tour_save' : 'saveTour',
            'click .btn_tour_confirm' : 'confirmTour',
            'click .btn_tour_close' : 'closeTour'  
        },
        onShow: function(e){
        	//passenger list
        	var passengers = new Passengers(new Passenger());
        	var loadPassengers = this.model.get("passenger");
        	console.log('loadPassengers is '+JSON.stringify(loadPassengers));
        	if(loadPassengers != undefined && loadPassengers.length>0){
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

        saveTour: function(e){
        	e.preventDefault();
          	
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);
    	    console.log("setting data: "+JSON.stringify(this.model));
    	    
    	    //save passenger data
    	    var pn = $("#pn").val();
    	    console.log('pn is '+pn);
    	    var passenger = new Array();
    	    for(var i=1;i<=pn;i++){
    	    	passenger[i-1]={
    	    			no:$("#pno"+i).val(),
    	    			group:$("#group"+i).val(),
    	    			name:$("#pname"+i).val(),
    	    			gender:$("#gender"+i).val(),
    	    			age:$("#age"+i).val(),
    	    			phone:$("#pphone"+i).val(),
    	    			fee:$("#fee"+i).val(),
    	    			meal:$("#meal"+i).val(),
    	    			admission:$("#admission"+i).val(),
    	    			pickup:$("#pickup"+i).val(),	
    	    			dropoff:$("#dropoff"+i).val(),
    	    			agency:$("#agency"+i).val()
    	    			
    	    	}
    	    	this.model.unset("pno"+i);
    	    	this.model.unset("group"+i);
    	    	this.model.unset("pname"+i);
    	    	this.model.unset("gender"+i);
    	    	this.model.unset("age"+i);
    	    	this.model.unset("pphone"+i);
    	    	this.model.unset("fee"+i);
    	    	this.model.unset("meal"+i);
    	    	this.model.unset("admission"+i);
    	    	this.model.unset("pickup"+i);
    	    	this.model.unset("dropoff"+i);
    	    	this.model.unset("agency"+i);
    	    }
    	    this.model.set("passenger",passenger);
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
    	    	this.model.unset('breakfast'+day);
    	    	this.model.unset('lunch'+day);
    	    	this.model.unset('dinner'+day);
    	    	this.model.unset('hotel'+day);
    	    }
    	    this.model.set({'itinerary':itinerary});
    	    
    	    //save bus data
    	    
    	    
    	    console.log("ready to save data: "+JSON.stringify(this.model));
    	    this.model.save();

    	    app.navigate("tour/"+this.model.get("code"),true);         	

        },
        confirmTour: function(e){

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
