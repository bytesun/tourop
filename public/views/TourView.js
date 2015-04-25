define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_list,

        events: {
            'click #btn_startTour' : 'startTour',
            'click #btn_tour_save' : 'saveTour',
//            'click #modal' : 'showSampleModal',
//            'click #confirm' : 'showSampleConfirm'
        },
        saveTour: function(e){
        	
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
