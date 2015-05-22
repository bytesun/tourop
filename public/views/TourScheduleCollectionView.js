define([
	'marionette',
	'templates',
    'underscore',
    'models/Schedule',
    'views/TourScheduleItemView'
    
], function (Marionette, templates, _,
		Schedule,
		TourScheduleItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: TourScheduleItemView,
	  childViewContainer: "#schedule_list_item",
	  template: templates.tour_schedule_list
	}); 
});
