define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
    'collections/Schedules',
    'views/ScheduleCollectionView',
    'views/ScheduleItemView'
], function (Marionette, templates, _,
		Syphon,
		Schedules,
		ScheduleCollectionView,
		ScheduleItemView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.route_info,
		regions:{
			scheduleRegion:"#schedule-list-region"
		},
	   initialize: function () {
//	        _.bindAll(this,this.render);		   
//	        this.model.bind('change', this.render);
//	        this.model.bind('change', _.bind(this.render, this));
	    },
        events: {
//        	'change .code_input': "fetchRoute",
        	"click .btn_route_save": "saveRoute",
        		
        },
        
        onShow: function(e){
        	
        	var collection = new Schedules();
        	collection.reset(this.model.get("schedule"));        	
        	
        	var collectionView = new ScheduleCollectionView({
    			collection:collection
    		});
        	
        	$("#days").val(collection.length);
        	this.scheduleRegion.show(collectionView);
    		
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
    	    
    	    //----------------fee data
    	    //fare
    	    var fare = new Array();
    	    for(var i=0;i<5;i++){
    	    	if($("#fare_name_"+i).val() != ''){
    	    		fare[i]={
        	    			name:$("#fare_name_"+i).val(),
        	    			price:$("#fare_price_"+i).val()
        	    	}	
    	    	}
    	    	
    	    }
    	    //meal
    	    var meal = new Array();
    	    for(var i=0;i<5;i++){
    	    	if($("#meal_name_"+i).val() != ''){
    	    		meal[i]={
        	    			name:$("#meal_name_"+i).val(),
        	    			price:$("#meal_price_"+i).val()
        	    	}	
    	    	}
    	    	
    	    }    	    
    	    //admission
    	    var admission = new Array();
    	    for(var i=0;i<5;i++){
    	    	if($("#admission_name_"+i).val() != ''){
    	    		admission[i]={
        	    			name:$("#admission_name_"+i).val(),
        	    			price:$("#admission_price_"+i).val()
        	    	}	
    	    	}
    	    	
    	    }    	    
    	    //schedule data
    	    var days=$("#days").val();
    	   
    	    var schedule = new Array();
    	    for(var day=1;day<=days;day++){
    	    	var sn= $("#sn"+day).val();
    	    	var scenic = new Array();
    	    	for(var i=0;i<sn;i++){
    	    		scenic[i]={
    	    				name:$("#scenic_name_"+day+"_"+i).val(),
    	    				telephone:$("#scenic_telephone_"+day+"_"+i).val(),
    	    				payment:$("#scenic_payment_"+day+"_"+i).val(),
    	    				address:$("#scenic_address_"+day+"_"+i).val(),
    	    		}
    	    		this.model.unset("scenic_name_"+day+"_"+i);
    	    		this.model.unset("scenic_telephone_"+day+"_"+i);
    	    		this.model.unset("scenic_payment_"+day+"_"+i);
    	    		this.model.unset("scenic_address_"+day+"_"+i);

    	    	}
    	    	schedule[day-1]={
    	    			day:$("#day"+day).val(),
    	    			from:$("#from"+day).val(),
    	    			via:$("#via"+day).val(),
    	    			to:$("#to"+day).val(),
    	    			scenic:scenic,
    	    			itinerary:$("#itinerary"+day).val(),
    	    	}
    	    	
    	    	
    	    	
    	    	//	remove duplicate fields
    	    	this.model.unset('day'+day);
    	    	this.model.unset('from'+day);
    	    	this.model.unset('via'+day);
    	    	this.model.unset('to'+day);
    	    	this.model.unset('itinerary'+day);
    	    }
    	    this.model.set({
    	    	fare:fare,
    	    	meal:meal,
    	    	admission:admission,
    	    	schedule:schedule
    	    });
    	    console.log("ready to save route data: "+JSON.stringify(this.model));
    	    this.model.save();
//    	    	fare:fare,
//    	    	meal:meal,
//    	    	admission:admission,
//    	    	schedule:schedule
//    	    });

    	    app.navigate("route/"+this.model.get("code"),true); 
        }


	});
});
