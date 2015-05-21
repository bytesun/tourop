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
			scheduleRegion:"#schedule_list_region",
			busRegion:"#bus_list_region"
		},
        events: {

            'click .btn_tour_save' : 'saveTour',
            'click .btn_tour_confirm' : 'confirmTour',
            'click .btn_tour_cancel' : 'cancelTour',
            'click .btn_tour_close' : 'closeTour'  
        },
        initialize: function(){
        	var self = this;
            app.commands.setHandler("tour:save", function() {
            	self._saveTour();
            });
        },
        saveTour:function(e){
        	e.preventDefault();
        	this._saveTour(e);
        	app.notify('','Tour information has been saved!','alert-info');
        },
        _saveTour: function(e){
        	 
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);
    	    
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
    	    	
    			var buscom={
    					code:$("#buscom_code_"+i).val(),
            			name : $("#buscom_name_"+i).val(),
            			payment:$("#buscom_payment_"+i).val(), //credit card/voucher/cheque/cash
            			telphone : $("#buscom_telphone_"+i).val(),
            			fax:$("#buscom_fax_"+i).val(),
            			contact : $("#buscom_contact_"+i).val(),
            			address : $("#buscom_address_"+i).val(),
            			city: $("#buscom_city_"+i).val(),
            			province: $("#buscom_province_"+i).val(),
            			country :$("#buscom_country_"+i).val(),
            			postcode:$("#buscom_postcode_"+i).val()
    			};    	    	
    	    	bus[i-1]={
    	    			no:$("#bno"+i).val(),
    	    			plateno:$("#plateno"+i).val(),
    	    			driver:$("#driver"+i).val(),
    	    			seats:$("#seats"+i).val(),
    	    			phone:$("#bphone"+i).val(),
    	    			buscom:buscom
    	    			
    	    	}

    	    	this.model.unset("bno"+i);
    	    	this.model.unset("plateno"+i);
    	    	this.model.unset("driver"+i);
    	    	this.model.unset("seats"+i);
    	    	this.model.unset("bphone"+i);
    	    	
    	    	
       	    	this.model.unset("buscom_code_"+i);
    	    	this.model.unset("buscom_name_"+i);
    	    	this.model.unset("buscom_payment_"+i);
    	    	this.model.unset("buscom_telphone_"+i);
    	    	this.model.unset("buscom_fax_"+i);
    	    	this.model.unset("buscom_contact_"+i);
    	    	this.model.unset("buscom_address_"+i);
    	    	this.model.unset("buscom_city_"+i);
    	    	this.model.unset("buscom_province_"+i);
    	    	this.model.unset("buscom_country_"+i);
    	    	this.model.unset("buscom_postcode_"+i);

    	    }
    	    this.model.set("bus",bus);    	    
    	    
    	    this.model.unset("routecode");
    	    console.log("ready to save data: "+JSON.stringify(this.model));
//    	    this.trigger("tour:save");
    	    this.model.save();
    	    
//    	    this.render();

//    	    app.navigate("tour",true);         	

        },
        confirmTour: function(e){
        	console.log('confirm a tour');
        	//generate confirmation reports
        	this.model.set({status:"Confirmed"});
        	this.model.save();
        	app.notify('','Tour information has been confirmed and no information can be changed!','alert-info');        	
        	 app.navigate("tour",true);  
        	//generate invoice reports
        }, 
        cancelTour: function(e){
        	console.log('cancel a tour');
        	this.model.save({status:"Canceled"});
        	app.notify('','The tour has been canceled!','alert-info');
        	app.navigate("tour",true); 
        },
        closeTour: function(e){
        	console.log('close tour');
        	this.model.set({status:"Close",feedback:$("#feedback").val()});
        	console.log("ready to close model: "+JSON.stringify(this.model));
        	this.model.save();
        	app.notify('','The tour has been closed!','alert-info');
        	app.navigate("tour",true); 
        }


	});
});
