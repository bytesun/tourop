define([
	'marionette',
	'templates',
    'underscore'
], function (Marionette, templates, _) {
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
        	app.navigate("hotel_new",true);
        },
        searchHotel : function(e){
        	app.navigate("hotel_search",true);

        },
        editHotel : function(e){
        	app.navigate("hotel_edit",true);
        	 
        },
        delHotel:function(){
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure deleting this hotel information?'
        	});        	
        }

	});
});
