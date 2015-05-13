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
			  "keyup .telephone":"formatTel",
	        	'change .buscom_input' :'addBuscom'
	        	
	        },
	        formatTel: function(e){
	        	e.preventDefault();
	        	
	        	var input = $(e.target).val();
	        	var length = input.length>14?14:input.length;
	        	var c = '';
	        	var out = '';
	        	for(var i=0;i<length;i++){
	        		c = input.substring(i,i+1);
	        		if(i==0 && c != '('){
	        			out = '(';
	        		}else if(i == 4 && c != ')'){
	        			out = out+') ';
	        		}else if(i == 9 && c != '-'){
	        			out = out+'-';
	        		}
	        		out = out+c;
	        	}
	        	
	        	$(e.target).val(out);
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
