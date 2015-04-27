define([
	'marionette',
	'templates',
    'underscore',
    'controllers/restaurant'
], function (Marionette, templates, _,restaurant) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.restaurant_list,

        events: {
        	'click .btn_restaurant_add': 'newRestaurant',
        	'click .btn_restaurant_search': 'searchRestaurant',
        	'click .a_restaurant_edit': 'editRestaurant',
        	'click .a_restaurant_delete': 'delRestaurant'
        },
        newRestaurant: function(e){
        	restaurant.newRestaurant();
        },
        searchRestaurant : function(){
        	restaurant.searchRestaurant();
        },
        editRestaurant : function(){
        	restaurant.editRestaurant();
        },
        delRestaurant:function(){
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure deleting this restaurant information?'
        	});        	
        }

	});
});
