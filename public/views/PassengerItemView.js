define([
	'marionette',
	'templates',
    'underscore',
    'models/Passenger'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_passenger_item,
		model:Model,
		tagName:'div',
        events: {
        	'change .passenger_agency' :'addAgency'
        	
        },
        addAgency : function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	//check admission first
        	var fetchingoitems = app.request("entities:informations",{c:inputstr,t:'A'});
        	$.when(fetchingoitems).done(function(items){
        		if(items.length >= 1){
        			var agency = items.at(0);
        			inputstr = agency.get("name")+"  ("+agency.get("telphone")+")  "+agency.get("address");
        			$("#"+inputid).val(inputstr);
        		}   	
        		
	        	
        	});       	

        }

	});
});
