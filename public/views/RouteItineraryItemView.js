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
        	

        }

	});
});
