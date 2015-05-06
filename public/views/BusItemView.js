define([
	'marionette',
	'templates',
    'underscore',
    'models/Bus'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_bus_item,
		model:Model,
		tagName:'div',
		  events: {
	        	'change .buscom_input' :'addBuscom'
	        	
	        },
	        addBuscom : function(e){
	        	e.preventDefault();
	        	var inputid = e.target.id;
	        	var inputstr = $("#"+inputid).val();
	        	//check admission first
	        	var fetchingoitems = app.request("entities:informations",{c:inputstr,t:'B'});
	        	$.when(fetchingoitems).done(function(items){
	        		if(items.length >= 1){
	        			var buscom = items.at(0);
	        			inputstr = buscom.get("name")+"  ("+buscom.get("telphone")+")  "+buscom.get("address");
	        			$("#"+inputid).val(inputstr);
	        		}   	
	        		
		        	
	        	});       	
	
	        }        
       
	});
});
