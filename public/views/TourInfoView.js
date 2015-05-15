define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
    'models/Passenger',
    'models/Group',
    'models/Bus',
    'collections/Passengers',
    'collections/Groups',
    'collections/Buses',
    'collections/Itinerarys',
    'views/ItineraryItemView',
    'views/ItineraryCollectionView',
    'views/GroupItemView',
    'views/GroupCollectionView',
    'views/BusItemView',
    'views/BusCollectionView'
    
], function (Marionette, templates, _,
		Syphon,
		Passenger,
		Group,
		Bus,
		Passengers,
		Groups,
		Buses,
		Itinerarys,
		ItineraryItemView,
		ItineraryCollectionView,
		GroupItemView,
		GroupCollectionView,
		BusItemView,
		BusCollectionView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.tour_info,
		regions:{
			groupRegion:"#group_list_region",
			itineraryRegion:"#itinerary_list_region",
			busRegion:"#bus_list_region"
		},
        events: {

            'click .btn_tour_save' : 'saveTour',
            'click .btn_tour_confirm' : 'confirmTour',
            'click .btn_tour_close' : 'closeTour'  
        },
        initialize: function(){
        	var self = this;
            app.commands.setHandler("tour:save", function() {
            	self.saveTour();
            });
        },
//        onShow: function(e){
//        	//Group list
//        	
//        	var groups = new Groups(new Group());
//        	var loadGroups = this.model.get("group");
//        	console.log('loadGroups is ',loadGroups);
//        	if(loadGroups != undefined && loadGroups.length>0){
//        		groups.reset(loadGroups);
//        	}
//        	
//        	var groupCollectionView = new GroupCollectionView({
//        		collection:groups
//        	});
//        	this.groupRegion.show(groupCollectionView);        	
//
//        	
//        	//itinerary list
//        	var collection = new Itinerarys();
//        	collection.reset(this.model.get("itinerary"));        	
//
//        	var collectionView = new ItineraryCollectionView({
//        		template:templates.tour_itinerary_list,
//        		childView:ItineraryItemView.extend({
//        			template: templates.tour_itinerary_item,
//        		}),
//    			collection:collection
//    		});
//        	
//        	this.itineraryRegion.show(collectionView);        	
//        	//bus list
//        	var buses = new Buses(new Bus());
//        	var loadBuses = this.model.get("bus");
//        	console.log('loadbuses is ',loadBuses);
//        	if(loadBuses != undefined && loadBuses.length>0){
//        		buses.reset(loadBuses);
//        	}
//        	
//        	var busCollectionView = new BusCollectionView({
//        		collection:buses
//        	});
//        	this.busRegion.show(busCollectionView);        	
//        	
//        },

        saveTour: function(e){
//        	e.preventDefault();
        	 
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);
//    	    var route = this.model.get("route");
    	    console.log("setting data: "+JSON.stringify(this.model));
    	    
    	    //------------------save passenger data-------------------
    	    var gn = $("#gn").val();

    	    var groups = new Array();
    	    for(var i=1;i<=gn;i++){

    			var pn=$("#pn_"+i).val();    			
    	    	var passengers = new Array();
    			for(var j=1;j<=pn;j++){
    				passengers[j-1]={
    					no:$("#pno_"+i+"_"+j).val(),
		    			name:$("#pname_"+i+"_"+j).val(),
		    			gender:$("#gender_"+i+"_"+j).val(),
		    			age:$("#age_"+i+"_"+j).val(),
		    			phone:$("#pphone_"+i+"_"+j).val(),
		    			fare:$("#fee_"+i+"_"+j).val(),
		    			meal:$("#meal_"+i+"_"+j).val(),
		    			admission:$("#admission_"+i+"_"+j).val(),
		    			roomtype:$("#roomtype_"+i+"_"+j).val(),
    				}

    				this.model.unset("pno_"+i+"_"+j);
        	    	this.model.unset("pname_"+i+"_"+j);
        	    	this.model.unset("gender_"+i+"_"+j);
        	    	this.model.unset("age_"+i+"_"+j);
        	    	this.model.unset("pphone_"+i+"_"+j);
        	    	this.model.unset("fee_"+i+"_"+j);
        	    	this.model.unset("meal_"+i+"_"+j);
        	    	this.model.unset("admission_"+i+"_"+j);
        	    	this.model.unset("roomtype_"+i+"_"+j);
        	    	
    			};
    			var agency={
    					code:$("#agency_code_"+i).val(),
            			name : $("#agency_name_"+i).val(),
            			payment:$("#agency_payment_"+i).val(), //credit card/voucher/cheque/cash
            			telphone : $("#agency_telphone_"+i).val(),
            			fax:$("#agency_fax_"+i).val(),
            			contact : $("#agency_contact_"+i).val(),
            			address : $("#agency_address_"+i).val(),
            			city: $("#agency_city_"+i).val(),
            			province: $("#agency_province_"+i).val(),
            			country :$("#agency_country_"+i).val(),
            			postcode:$("#agency_postcode_"+i).val()
    			};
    			
    	    	groups[i-1]={
    	    			no:$("#group"+i).val(),
    	    			status:$("#status"+i).val(),
    	    			bookdate:$("#bookdate"+i).val(),
    	    			pickup:$("#pickup"+i).val(),	
    	    			dropoff:$("#dropoff"+i).val(),
    	    			commission:$("#commission"+i).val(),
    	    			agency:agency,
    	    			passenger:passengers
    	    			
    	    	}
    	    	this.model.unset("no"+i);
    	    	this.model.unset("status"+i);
    	    	this.model.unset("agency_code_"+i);
    	    	this.model.unset("agency_name_"+i);
    	    	this.model.unset("agency_payment_"+i);
    	    	this.model.unset("agency_telphone_"+i);
    	    	this.model.unset("agency_fax_"+i);
    	    	this.model.unset("agency_contact_"+i);
    	    	this.model.unset("agency_address_"+i);
    	    	this.model.unset("agency_city_"+i);
    	    	this.model.unset("agency_province_"+i);
    	    	this.model.unset("agency_country_"+i);
    	    	this.model.unset("agency_postcode_"+i);
    	    	
    	    	this.model.unset("bookdate"+i);
    	    	this.model.unset("pickup"+i);
    	    	this.model.unset("dropoff"+i);
    	    	this.model.unset("agency"+i);
    	    	this.model.unset("commission"+i);
    	    }
    	    this.model.set("group",groups);
    	    //----------------save itinerary data---------------
    	    var days=$("#days").val();
    	    var itinerary = new Array();
    	    for(var day=1;day<=days;day++){
    	    	//get itinerary string
    	    	var adm = "";
    	    	var index = 1;
    	    	while($("#adm"+day+"_"+index).val() != undefined ){
    	    		if(index == 1)
    	    			adm = $("#adm"+day+"_"+index).val();
    	    		else
    	    			adm = adm+"|"+$("#adm"+day+"_"+index).val();
    	    		index++;
    	    	}
    	    	console.log('adm is :'+adm);
    	    	itinerary[day-1]={
    	    			day:$("#day"+day).val(),
    	    			from:$("#from"+day).val(),
    	    			via:$("#via"+day).val(),
    	    			to:$("#to"+day).val(),
    	    			breakfast:$("#breakfast"+day).val(),
    	    			lunch:$("#lunch"+day).val(),
    	    			dinner:$("#dinner"+day).val(),
    	    			hotel:$("#hotel"+day).val(),
    	    			itinerary:adm

    	    	};
    	    	//remove duplicate fields
    	    	this.model.unset('day'+day);
    	    	this.model.unset('from'+day);
    	    	this.model.unset('via'+day);
    	    	this.model.unset('to'+day);
    	    	this.model.unset('adm_'+day);
    	    	this.model.unset('breakfast'+day);
    	    	this.model.unset('lunch'+day);
    	    	this.model.unset('dinner'+day);
    	    	this.model.unset('hotel'+day);
    	    }
    	    this.model.set({'itinerary':itinerary});
    	    
    	    //---------------------save bus data----------------------
    	    var bn = $("#bn").val();
    	    console.log('bn is '+bn);
    	    var bus = new Array();
    	    for(var i=1;i<=bn;i++){
    	    	bus[i-1]={
    	    			no:$("#bno"+i).val(),
    	    			plateno:$("#plateno"+i).val(),
    	    			driver:$("#driver"+i).val(),
    	    			seats:$("#seats"+i).val(),
    	    			phone:$("#bphone"+i).val(),
//    	    			buscom:$("#buscom"+i).val(),
    	    			
    	    	}

    	    	this.model.unset("bno"+i);
    	    	this.model.unset("plateno"+i);
    	    	this.model.unset("driver"+i);
    	    	this.model.unset("seats"+i);
    	    	this.model.unset("bphone"+i);
    	    	this.model.unset("buscom"+i);

    	    }
    	    this.model.set("bus",bus);    	    
    	    
    	    console.log("ready to save data: "+JSON.stringify(this.model));
//    	    this.trigger("tour:save");
    	    this.model.save();

//    	    app.navigate("tour",true);         	

        },
        confirmTour: function(e){
        	console.log('confirm a tour');
        	//generate confirmation reports
        	
        	
        	//generate invoice reports
        },        
        closeTour: function(e){
        	console.log('close tour');
        	app.request("app:dialog:simple", {
                title: 'Input memo information to close this tour',
                message: 'Input close information'
            },
            templates.tour_memo);
        }


	});
});
