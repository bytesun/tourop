define([
	'marionette',
	'templates',
    'underscore',
    'controllers/tour'
], function (Marionette, templates, _,tour) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_list,

        events: {
            'click #btn_startTour' : 'startTour',
            'click #btn_tour_new' : 'newTour',
//            'click #modal' : 'showSampleModal',
//            'click #confirm' : 'showSampleConfirm'
        },
        newTour: function(e){
        	tour.newTour();
        },
        startTour: function(e){
        	console.log('start tour');
            app.execute("app:dialog:simple", {
                title: 'Start a new tour', // Optional
                message: 'Input new tour information'
            },
            templates.newTour);
        }

	});
});
