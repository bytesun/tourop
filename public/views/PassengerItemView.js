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
        	"keyup .telephone":"formatTel",
        	'change .passenger_agency' :'addAgency'
        	
        },
        formatTel: function(e){
        	e.preventDefault();
        	
        	var input = $(e.target).val();
        	var length = input.length>13?13:input.length;
        	var c = '';
        	var out = '';
        	for(var i=0;i<length;i++){
        		c = input.substring(i,i+1);
        		if(i==0 && c != '('){
        			out = '(';
        		}else if(i == 4 && c != ')'){
        			out = out+')';
        		}else if(i == 8 && c != '-'){
        			out = out+'-';
        		}
        		out = out+c;
        	}
        	
        	$(e.target).val(out);
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
