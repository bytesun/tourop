define([
	'marionette',
	'templates',
    'underscore'
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_list,

        events: {
            'click .btn_tour_add' : 'newTour'
        },
        newTour: function(e){
        	app.navigate("tour_info",true);
        }

	});
});
