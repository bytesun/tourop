define([
	'marionette',
	'templates',
    'underscore',
    'syphon'
], function (Marionette, templates, _,
		Syphon) {
	'use strict';

	return Marionette.ItemView.extend({
	 	template: templates.hotel_info,
		 events: {
			    "submit form": "formSubmitted"
	    },
			 
	  formSubmitted: function(e){
	    e.preventDefault();
	 
	    var data = Syphon.serialize(this);
	    this.model.set(data);
	    console.log('save hotel: '+data);
//	    this.model.save();
	    
	    //redirect list page
	    app.navigate("hotel_list",true);
//	    controller.hotel_list();
	  }

//        events: {
//        	'click .btn_hotel_save': 'saveHotel'
//        },
//        saveHotel: function(e){
//        	e.preventDefault();
//        	var hotel = {
//        		code: $("#code").val(),
//        		name: $("#name").val(),
//        		address: $("#address").val(),
//        	};
//        	console.log(JSON.stringify(hotel));
//        	this.trigger("hotel:save",{
//        		code: $("#code").val(),
//        		name: $("#name").val(),
//        		address: $("#address").val(),
//        	});
//        }
	});
});
