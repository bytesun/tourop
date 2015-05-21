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
			faresRegion: "#fare_collection_region",
			mealsRegion: "#meal_collection_region",
			admissionsRegion: "#admission_collection_region",
			scheduleRegion:"#schedule-list-region"
		},
	   initialize: function () {
//	        _.bindAll(this,this.render);		   
//	        this.model.bind('change', this.render);
//	        this.model.bind('change', _.bind(this.render, this));
	    },
        events: {
//        	'change .code_input': "fetchRoute",
        	'click .btn_add_faretype': 'addFaretype',
        	"click .btn_route_save": "saveRoute",
        		
        },
//		initialize : function() {
//			  this.listenTo(this.model, 'change', this.render);
//		},          

        addFaretype: function(e){
        	e.preventDefault();
//        	this._saveRoute(e);
        	
        },

        _saveRoute: function(e){
        	e.preventDefault();
          	
    	    var data = Syphon.serialize(this);
//    	    
    	    this.model.set(data);
    	    
    	    //----------------fee data
    	    //fare
    	    var fn=$("#fn").val();
    	    var fare = new Array();
    	    for(var i=1;i<=fn;i++){

    	    	if($("#fare_name_"+i).val() != ''){
    	    		
    	    		fare[i-1]={
        	    			name:$("#fare_name_"+i).val(),
        	    			price:$("#fare_price_"+i).val()
        	    	}	
    	    	}
    	    	
    	    }
    	    //meal
    	    var mn = $("#mn").val();
    	    var meal = new Array();
    	    for(var i=1;i<=mn;i++){
    	    	if($("#meal_name_"+i).val() != ''){
    	    		meal[i-1]={
        	    			name:$("#meal_name_"+i).val(),
        	    			price:$("#meal_price_"+i).val()
        	    	}	
    	    	}
    	    	
    	    }    	    
    	    //admission
    	    var an = $("#an").val();
    	    var admission = new Array();
    	    for(var i=1;i<=an;i++){
    	    	if($("#admission_name_"+i).val() != ''){
    	    		admission[i-1]={
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

    	    	}
    	    	schedule[day-1]={
    	    			day:$("#day"+day).val(),
    	    			from:$("#from"+day).val(),
    	    			via:$("#via"+day).val(),
    	    			to:$("#to"+day).val(),
    	    			scenic:scenic,
    	    			itinerary:$("#itinerary"+day).val(),
    	    	}

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

    	   
        },
        saveRoute: function(e){
        	this._saveRoute(e);
        	 app.navigate("route/"+this.model.get("code"),true); 
        }


	});
});
