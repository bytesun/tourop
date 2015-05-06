define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
    'collections/Itinerarys',
    'views/ItineraryCollectionView',
    'views/ItineraryItemView'
], function (Marionette, templates, _,
		Syphon,
		Itinerarys,
		ItineraryCollectionView,
		ItineraryItemView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.route_info,
		regions:{
			itineraryRegion:"#itinerary-list-region"
		},
	   initialize: function () {
//	        _.bindAll(this,this.render);		   
//	        this.model.bind('change', this.render);
//	        this.model.bind('change', _.bind(this.render, this));
	    },
        events: {
//        	'change .code_input': "fetchRoute",
        	"click .btn_route_save": "saveRoute",
        	"click .btn_route_itinerary":"listItinerary"     	
        		
        },
        
        onShow: function(e){
        	
        	var collection = new Itinerarys();
        	collection.reset(this.model.get("itinerary"));        	
        	
        	var collectionView = new ItineraryCollectionView({
    			collection:collection
    		});
        	
        	$("#days").val(collection.length);
        	this.itineraryRegion.show(collectionView);
    		
        },
//        fetchRoute:function(e){
//        	var that = this;
//        	var inputstr = $(".code_input").val();
//        	var fetchingroutes = app.request("entities:routes",{c:inputstr});
//        	$.when(fetchingroutes).done(function(routes){
//        		if(routes.length >= 1){
//        			console.log('that model before :'+JSON.stringify(that.model));
//        			var route = routes.at(0);
//        			that.model.set({
//        				code:route.get("code"),
//        				name:route.get("name"),
//        				days:route.get("days"),
//        				
//        			});
//        			console.log('that model :'+JSON.stringify(that.model));
//        			
//        		}
//        	});
//        	
//        },
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
//    	    console.log("ready to save data: "+JSON.stringify(this.model));
    	    this.model.save();

    	    app.navigate("route/"+this.model.get("code"),true); 
        }


	});
});
