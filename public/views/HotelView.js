define([
	'marionette',
	'templates',
    'underscore',
    'controllers/hotel'
], function (Marionette, templates, _, hotel) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.hotel_list,

        events: {
        	'click .btn_hotel_add': 'newHotel',
        	'click .btn_hotel_search': 'searchHotel',
        	'click .a_hotel_edit': 'editHotel',
        	'click .a_hotel_delete': 'delHotel'
        },
        newHotel: function(e){
        	hotel.newHotel();
        },
        searchHotel : function(){
        	hotel.searchHotel();
        },
        editHotel : function(){
        	hotel.editHotel();
        },
        delHotel:function(){
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure deleting this hotel information?'
        	});        	
        }

	});
});
