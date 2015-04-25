define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour,

        events: {
            'click #btn_startTour' : 'startTour'
//            'click #modal' : 'showSampleModal',
//            'click #confirm' : 'showSampleConfirm'
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
