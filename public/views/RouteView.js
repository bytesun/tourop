define([
	'marionette',
	'templates',
    'underscore',
    'controllers/route'
], function (Marionette, templates, _,route) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.route_list,

        events: {
            'click .route_new' : 'newRoute',
            'click .a_route_code' : 'newRoute',
            'click .btn_route_start':'startRoute',
            'click .a_route_edit' : 'editRoute',
            'click .a_route_delete' : 'deleteRoute'
        },
        newRoute: function(){
        	route.newRoute();
        },
        editRoute: function(){
        	route.editRoute();
        },
        
        startRoute: function(){
        	
        	app.navigate("tour_new",true);
        },
        
        deleteRoute:function(){
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure deleting this route information?'
        	});        	
        }

	});
});
