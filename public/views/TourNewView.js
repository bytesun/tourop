define([
	'marionette',
	'templates',
    'underscore'
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_new,

        events: {
            'click .btn_tour_add' : 'newTour'
        },
        newTour: function(e){
        	//app.navigator("tour_new",true);
        }

	});
});
