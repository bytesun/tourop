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
            'click .route_delete' : 'deleteRoute'
            	
//            'click #modal' : 'showSampleModal',
//            'click #confirm' : 'showSampleConfirm'
        },
        newRoute: function(){
        	route.newRoute();
        },
        startRoute: function(){
        	route.startTour();
        },
        deleteRoute:function(){
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure deleting this route information?'
        	});        	
        }

	});
});
