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
            'click .btn_tour_add' : 'newTour'
          

        },
        newTour: function(e){
        	tour.newTour();
        },
        startTour: function(e){

            app.execute("app:dialog:simple", {
                title: 'Start a new tour', // Optional
                message: 'Input new tour information'
            },
            templates.newTour);
        }
        

	});
});
