define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.hotel_list,

        events: {
        	'click .hotel_new': 'newHotel'
//            'click #notify' : 'notify',
//            'click #modal' : 'showSampleModal',
//            'click #confirm' : 'showSampleConfirm'
        },
        newHotel: function(e){
        	
        }

	});
});
