define([
	'marionette',
	'templates',
    'underscore',
    'models/Itinerary'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.route_itinerary_item,
		model:Model,
		tagName:'div',
        events: {
        	'change .itinerary_input' :'addItinerary',
        	'change .breakfast_input':'addBreakfast',
        	'change .lunch_input':'addLunch',
        	'change .dinner_input':'addDinner',
        	'change .hotel_input':'addHotel'
        },
        addItinerary : function(e){
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	//check admission first
        	var fetchingocases = app.request("entities:informations",{c:inputstr,t:'S'});
        	$.when(fetchingocases).done(function(infos){
        		if(infos.length >= 1){
        			var admission = infos.at(0);
        			inputstr = admission.get("code")+"-"+admission.get("name");//+"("+admission.get("telphone")+")";
        		}
            	
            	var day = inputid.substring(inputid.indexOf('_')+1,inputid.length);
            	var index = $("#admindex_"+day).val();

            	
            	$("#"+inputid).before("<input class=\"form-control\" id=\"adm"+day+"_"+index+"\" value=\""+inputstr+"\"><br>");
            	$("#"+inputid).val("");
            	$("#admindex_"+day).val(parseInt(index)+1);
	        	
        	});
        	

        },
        addBreakfast: function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	//check admission first
        	var fetchingoitems = app.request("entities:informations",{c:inputstr,t:'R'});
        	$.when(fetchingoitems).done(function(items){
        		if(items.length >= 1){
        			var restaurant = items.at(0);
        			inputstr = restaurant.get("name")+"  ("+restaurant.get("telphone")+")  "+restaurant.get("address");
        			$("#"+inputid).val(inputstr);
        		}   	
        		
	        	
        	});    
        },
        addLunch: function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	//check admission first
        	var fetchingoitems = app.request("entities:informations",{c:inputstr,t:'R'});
        	$.when(fetchingoitems).done(function(items){
        		if(items.length >= 1){
        			var restaurant = items.at(0);
        			inputstr = restaurant.get("name")+"  ("+restaurant.get("telphone")+")  "+restaurant.get("address");
        			$("#"+inputid).val(inputstr);
        		}   	
        		
	        	
        	}); 
        },
        addDinner: function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	//check admission first
        	var fetchingoitems = app.request("entities:informations",{c:inputstr,t:'R'});
        	$.when(fetchingoitems).done(function(items){
        		if(items.length >= 1){
        			var restaurant = items.at(0);
        			inputstr = restaurant.get("name")+"  ("+restaurant.get("telphone")+")  "+restaurant.get("address");
        			$("#"+inputid).val(inputstr);
        		}   	
        		
	        	
        	}); 
        },
        addHotel: function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	//check admission first
        	var fetchingoitems = app.request("entities:informations",{c:inputstr,t:'H'});
        	$.when(fetchingoitems).done(function(items){
        		if(items.length >= 1){
        			var hotel = items.at(0);
        			inputstr = hotel.get("name")+"  ("+hotel.get("telphone")+")  "+hotel.get("address");
        			$("#"+inputid).val(inputstr);
        		}   	
        		
	        	
        	}); 
        },

        

	});
});
