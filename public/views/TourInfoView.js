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
            'click .btn_tour_revise' : 'reviseTour',
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
        	if (!this.model.isValid()) {
        		app.notify('Error',this.model.validationError,'alert-danger');
        	}else{
        		app.notify('','Tour information has been saved!','alert-info');
        	}
        },
        _saveTour: function(e){
        	 
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);
    	    //------------------save passenger data-------------------
    	    var gn = $("#gn").val();

    	    var groups = new Array();
    	    for(var i=1;i<=gn;i++){

    			var pn=$("#tn_"+i).val();    			
    	    	var tourists = new Array();
    			for(var j=1;j<=pn;j++){
    				tourists[j-1]={
    					no:$("#pno_"+i+"_"+j).val(),
		    			name:$("#pname_"+i+"_"+j).val(),
		    			gender:$("#gender_"+i+"_"+j).val(),
		    			age:$("#age_"+i+"_"+j).val(),
		    			phone:$("#pphone_"+i+"_"+j).val(),
		    			fare:$("#fare_"+i+"_"+j).val(),
		    			meal:$("#meal_"+i+"_"+j).val(),
		    			admission:$("#admission_"+i+"_"+j).val(),
		    			roomtype:$("#roomtype_"+i+"_"+j).val(),
		    			fcommission:$("#fcommission_"+i+"_"+j).val(),
		    			mcommission:$("#mcommission_"+i+"_"+j).val(),
    				}


        	    	
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
//    	    			commission:$("#commission"+i).val(),
//    	    			adjustamount:$("#adjustamount"+i).val(),
    	    			agency:agency,
    	    			tourist:tourists
    	    			
    	    	}
    	    	
    	    }
    	    this.model.set("group",groups);
    	    //----------------save schedule data---------------
    	    var days=$("#days").val();
    	    var schedule = new Array();
    	    for(var day=1;day<=days;day++){
    	    	//breakfast
    	    	var breakfast={
               			code : $("#breakfast_code_"+day).val(),
            			name :  $("#breakfast_name_"+day).val(),
            			payment: $("#breakfast_payment_"+day).val(), //credit card/voucher/cheque/cash
            			telphone :  $("#breakfast_telphone_"+day).val(),
            			fax: $("#breakfast_fax_"+day).val(),
            			contact :  $("#breakfast_contact_"+day).val(),
            			address :  $("#breakfast_address_"+day).val(),
            			city:  $("#breakfast_city_"+day).val(),
            			province:  $("#breakfast_province_"+day).val(),
            			country : $("#breakfast_country_"+day).val(),
            			postcode: $("#breakfast_postcode_"+day).val()
    	    	};
    	    	
    	    	//lunch
    	    	var lunch = {
               			code : $("#lunch_code_"+day).val(),
            			name :  $("#lunch_name_"+day).val(),
            			payment: $("#lunch_payment_"+day).val(), //credit card/voucher/cheque/cash
            			telphone :  $("#lunch_telphone_"+day).val(),
            			fax: $("#lunch_fax_"+day).val(),
            			contact :  $("#lunch_contact_"+day).val(),
            			address :  $("#lunch_address_"+day).val(),
            			city:  $("#lunch_city_"+day).val(),
            			province:  $("#lunch_province_"+day).val(),
            			country : $("#lunch_country_"+day).val(),
            			postcode: $("#lunch_postcode_"+day).val()
    	    	};
    	    	//dinner
    	    	var dinner = {
               			code : $("#dinner_code_"+day).val(),
            			name :  $("#dinner_name_"+day).val(),
            			payment: $("#dinner_payment_"+day).val(), //credit card/voucher/cheque/cash
            			telphone :  $("#dinner_telphone_"+day).val(),
            			fax: $("#dinner_fax_"+day).val(),
            			contact :  $("#dinner_contact_"+day).val(),
            			address :  $("#dinner_address_"+day).val(),
            			city:  $("#dinner_city_"+day).val(),
            			province:  $("#dinner_province_"+day).val(),
            			country : $("#dinner_country_"+day).val(),
            			postcode: $("#dinner_postcode_"+day).val()
    	    	};
    	    	
    	    	//hotel
    	    	var hotel = {
               			code : $("#hotel_code_"+day).val(),
            			name :  $("#hotel_name_"+day).val(),
            			payment: $("#hotel_payment_"+day).val(), //credit card/voucher/cheque/cash
            			telphone :  $("#hotel_telphone_"+day).val(),
            			fax: $("#hotel_fax_"+day).val(),
            			contact :  $("#hotel_contact_"+day).val(),
            			address :  $("#hotel_address_"+day).val(),
            			city:  $("#hotel_city_"+day).val(),
            			province:  $("#hotel_province_"+day).val(),
            			country : $("#hotel_country_"+day).val(),
            			postcode: $("#hotel_postcode_"+day).val()
    	    	};
    	    	
    	    	var scenic_count = $("#scenic_count_"+day).val();
    	    	var scenic = new Array();
    	    	for(var s=0;s<scenic_count;s++){
    	    		scenic[s]={
    	    				code:$("#scenic_code_"+day+"_"+s).val(),
    	    				name:$("#scenic_name_"+day+"_"+s).val(),
            				telphone:$("#scenic_telphone_"+day+"_"+s).val(),
            				address:$("#scenic_address_"+day+"_"+s).val(),
            				city:$("#scenic_city_"+day+"_"+s).val(),
            				province:$("#scenic_province_"+day+"_"+s).val(),
            				payment:$("#scenic_payment_"+day+"_"+s).val()
    	    		}
    	    	}
    	    	schedule[day-1]={
    	    			day:$("#day"+day).val(),
    	    			from:$("#from"+day).val(),
    	    			via:$("#via"+day).val(),
    	    			to:$("#to"+day).val(),
    	    			breakfast:breakfast,
    	    			lunch:lunch,
    	    			dinner:dinner,
    	    			hotel:hotel,
    	    			scenic:scenic,
    	    			itinerary:$("#itinerary"+day).val(),

    	    	};

    	    }
    	    this.model.set({'schedule':schedule},{validate: true});
    	    
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


    	    }
    	    this.model.set("bus",bus);    	    
    	    
    	    this.model.unset("routecode");
//    	    console.log("ready to save data: "+JSON.stringify(this.model));
//    	    this.trigger("tour:save");
    	    this.model.save();
    	    
//    	    this.render();

//    	    app.navigate("tour",true);  


        },
        confirmTour: function(e){

        	console.log('confirm a tour');
			var self =this;
			app.execute('app:dialog:confirm',{title:'Confirm!',message:'You will confirm TOUR : <b>\"'+self.model.get('name')+"\"</b>! Are you sure?",
        		confirmNo: function(){
        			console.log('cancel deleting operation');
        		},
        		confirmYes:function(){

                	//generate confirmation reports
                	self.model.set({status:"Confirmed"});
                	self._saveTour(e);
                	// self.model.save();
                	self.trigger("tour:generatePayables",self.model);
					//generate payables
	
                	app.notify('','Tour information has been confirmed and no information can be changed!','alert-info');        	
                	 app.navigate("tour",true); 	
        		}});
        	
 
        	//generate invoice reports
        	
        
        	
        }, 
        cancelTour: function(e){
        	console.log('cancel a tour');
			var self =this;
			app.execute('app:dialog:confirm',{title:'Confirm!',message:'You will cancel <b>\"'+self.model.get('name')+"\"</b>! Are you sure?",
        		confirmNo: function(){
        			console.log('cancel deleting operation');
        		},
        		confirmYes:function(){
                	self.model.save({status:"Canceled"});
                	//also update invoice status
                	var fetchingitems = app.request("entities:invoices",{c:self.model.get("code")});
		        	$.when(fetchingitems).done(function(invoices){
		        		var inv = null;
		        		while(inv = invoices.pop()){
		        			inv.save({status:'Canceled'});
		        			console.log('cancel invoice :'+JSON.stringify(inv));
		        		}
		        	});	
                	app.notify('','The tour has been canceled!','alert-info');
                	app.navigate("tour",true); 	
        		}});        	
        	

        },
        reviseTour: function(e){
        	console.log('revise a tour');
        	// this.model.save({status:"New"});
        	var self =this;
        	//remove payables records
   			var fetchingitems = app.request("entities:payables",{tourcode:self.model.get("code")});
		        	$.when(fetchingitems).done(function(payables){
		        		var p = null;
		        		while(p = payables.pop()){
		        			p.destroy({success: function(model, response) {
  								console.log('delete payable :'+JSON.stringify(p));
							}});
		        			
		        		}
		        	});	
			var self =this;
			app.execute('app:dialog:confirm',{title:'Confirm!',message:'<b>\"'+self.model.get('name')+"\"</b> will be revised and all payables will be deleted! Are you sure?",
        		confirmNo: function(){
        			console.log('cancel revise operation');
        		},
        		confirmYes:function(){
                	self.model.set({status:"New"});
                	self.model.save();
                	app.notify('','The tour has been revised! and all payable records have been deleted!!','alert-info');
                	app.navigate("tour",true); 	
        		}});      		        	

        },
        closeTour: function(e){
        	console.log('close tour');
        	
			var self =this;
			app.execute('app:dialog:confirm',{title:'Confirm!',message:'<b>\"'+self.model.get('name')+"\"</b> will be closed and it can't be revised! Are you sure?",
        		confirmNo: function(){
        			console.log('cancel deleting operation');
        		},
        		confirmYes:function(){
                	self.model.set({status:"Closed",feedback:$("#feedback").val()});

                	self.model.save();
                	app.notify('','The tour has been closed!','alert-info');
                	app.navigate("tour",true); 	
        		}});        	
        	        	

        }


	});
});
