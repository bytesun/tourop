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
    	    	console.log('fare name is :'+$("#fare_name_"+i).val());
    	    	if($("#fare_name_"+i).val() != ''){    	    		
    	    		fare[i-1]={
    	    				no:$("#fare_no_"+i).val(),
        	    			name:$("#fare_name_"+i).val(),
        	    			price:$("#fare_price_"+i).val()
        	    	}	
    	    	}
    	    	
    	    }
    	    //meal
    	    var mn = $("#mn").val();
    	    var meal = new Array();
    	    for(var i=1;i<=mn;i++){
    	    	console.log('meal name is :'+$("#meal_name_"+i).val());
    	    	if($("#meal_name_"+i).val() != ''){
    	    		meal[i-1]={
    	    				no:$("#meal_no_"+i).val(),
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
    	    				no:$("#admission_no_"+i).val(),
        	    			name:$("#admission_name_"+i).val(),
        	    			price:$("#admission_price_"+i).val()
        	    	}	
    	    	}
    	    	
    	    }    	    
    	    //schedule data
    	    var days=$("#days").val();
    	   
    	    var schedule = new Array();
    	    for(var day=1;day<=days;day++){
    	    	var sn= $("#partner_count_"+day).val();
    	    	var scenic = new Array();
    	    	for(var i=1;i<=sn;i++){
    	    		scenic[i-1]={
    	    				no:$("#scenic_no_"+day+"_"+i).val(),
    	    				name:$("#scenic_name_"+day+"_"+i).val(),
    	    				telphone:$("#scenic_telphone_"+day+"_"+i).val(),
    	    				payment:$("#scenic_payment_"+day+"_"+i).val(),
    	    				address:$("#scenic_address_"+day+"_"+i).val(),
    	    				
                   			code : $("#scenic_code_"+day+"_"+i).val(),
                			fax: $("#scenic_fax_"+day+"_"+i).val(),
                			contact :  $("#scenic_contact_"+day+"_"+i).val(),
                			city:  $("#scenic_city_"+day+"_"+i).val(),
                			province:  $("#scenic_province_"+day+"_"+i).val(),
                			country : $("#scenic_country_"+day+"_"+i).val(),
                			postcode: $("#scenic_postcode_"+day+"_"+i).val()    	    				
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
    	    },{validate: true});
    	    console.log("ready to save route data: "+JSON.stringify(this.model));
    	    if (!this.model.isValid()) {
        		app.notify('Error',this.model.validationError,'alert-danger');
        	}else{
        		 this.model.save();
        	}
    	   
//    	    	fare:fare,
//    	    	meal:meal,
//    	    	admission:admission,
//    	    	schedule:schedule
//    	    });

    	   
        },
        saveRoute: function(e){
        	this._saveRoute(e);
        	if (this.model.isValid()) {
        	 app.navigate("route/"+this.model.get("code"),true);
        	}
        }


	});
});
