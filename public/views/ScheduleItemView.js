define([
	'marionette',
	'templates',
    'underscore',
    'models/Schedule'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.route_schedule_item,
		model:Model,
		tagName:'div',
        events: {
        	'change .scenic_input' :'fetchScenic',
        	'click .btn_add_scenic' :'addScenic',
        	'click .btn_del_scenic' :'delScenic',
        	'change .breakfast_input':'addBreakfast',
        	'change .lunch_input':'addLunch',
        	'change .dinner_input':'addDinner',
        	'change .hotel_input':'addHotel'
        },
		initialize : function() {
			  this.listenTo(this.model, 'change', this.render);
		},        
     
        addScenic: function(){


        	var day = this.model.get('day');
        	var sn= $("#sn"+day).val();
	    	var scenic = new Array();
	    	for(var i=0;i<sn;i++){
	    		scenic[i]={
	    				name:$("#scenic_name_"+day+"_"+i).val(),
	    				telephone:$("#scenic_telephone_"+day+"_"+i).val(),
	    				payment:$("#scenic_payment_"+day+"_"+i).val(),
	    				address:$("#scenic_address_"+day+"_"+i).val(),
	    		}

	    	}
	    	scenic[sn]={
        			name:'',
    				telephone:'',
    				address:'',
    				city:'',
    				province:'',
    				payment:''
        			
        	}
	    	this.model.set({
	    			
	    			from:$("#from"+day).val(),
	    			via:$("#via"+day).val(),
	    			to:$("#to"+day).val(),
	    			scenic:scenic,
	    			itinerary:$("#itinerary"+day).val(),
	    	});
        	console.log('scenic '+JSON.stringify(this.model));

        },
        delScenic: function(){
        	var scenic = this.model.get('scenic');
        	console.log('orignial model:'+JSON.stringify(this.model));
        	var sc = new Array();
        	for(var i=0;i<scenic.length-1;i++){
        		sc[i]=scenic[i]
        	}
        	
        	this.model.set({
        		scenic:sc
        	})
        	console.log('update model:'+JSON.stringify(this.model));
        },
        fetchScenic : function(e){
        	var inputid = e.target.id;
        	var index = inputid.substring(12);
        	var code = $("#"+inputid).val();
        	//check admission first
        	var fetchingitem = app.request("information:entity:fetch",code);
        	$.when(fetchingitem).done(function(info){
        		if(info != null){
                	$("#"+inputid).val(info.get('name'));
                	$("#scenic_telephone_"+index).val(info.get('telphone'));
                	$("#scenic_payment_"+index).val(info.get('payment'));
                	$("#scenic_address_"+index).val(info.get('address')+", " +info.get('city'));
//                	$("#"+inputid).before("<input class=\"form-control\" id=\"adm"+day+"_"+index+"\" value=\""+inputstr+"\"><br>");
//                	$("#"+inputid).val("");
//                	$("#admindex_"+day).val(parseInt(index)+1);
        		}
            	
            	
	        	
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
