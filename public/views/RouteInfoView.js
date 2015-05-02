define([
	'marionette',
	'templates',
    'underscore',
    'controllers/route',
    'syphon',
    'collections/Itinerarys',
    'views/RouteItineraryCollectionView',
    'views/RouteItineraryItemView'
], function (Marionette, templates, _,route,
		Syphon,
		Itinerarys,
		RouteItineraryCollectionView,
		RouteItineraryItemView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.route_info,
		regions:{
			itineraryRegion:"#itinerary-list-region"
		},
        events: {
        	"click .btn_route_save": "saveRoute",
        	"click .btn_route_itinerary":"listItinerary"     	
        		
        },
        onShow: function(e){
        	
        	var collection = new Itinerarys();
        	collection.reset(this.model.get("itinerary"));        	
        	
        	var collectionView = new RouteItineraryCollectionView({
    			collection:collection
    		});
        	
        	$("#days").val(collection.length);
        	this.itineraryRegion.show(collectionView);
    		
        },
        saveRoute: function(e){
        	e.preventDefault();
          	
    	    var data = Syphon.serialize(this);
//    	    console.log('submit route data ==='+JSON.stringify(data));
//    	    
    	    this.model.set(data);
    	    
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
    	    console.log("ready to save data: "+JSON.stringify(this.model));
    	    this.model.save();

    	    app.navigate("route/"+this.model.get("code"),true); 
        }


	});
});
