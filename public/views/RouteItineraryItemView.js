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
        	'change .itinerary_input' :'addItinerary'
        },
        addItinerary : function(e){
        	var inputid = e.target.id;
        	var day = inputid.substring(inputid.indexOf('_')+1,inputid.length);
        	console.log('day is '+day);
        	var index = $("#admindex_"+day).val();
        	console.log('index is '+index);
        	
        	$("#"+inputid).before("<input class=\"form-control\" id=\"adm"+day+"_"+index+"\" value=\""+$("#"+inputid).val()+"\"><br>");
        	$("#"+inputid).val("");
        	$("#admindex_"+day).val(parseInt(index)+1);
        }

	});
});
