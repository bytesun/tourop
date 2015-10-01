define([
	'marionette',
	'templates',
    'underscore',
    'models/Schedule',
    'collections/Schedules',
    'views/TourScheduleItemView'
    
], function (Marionette, templates, _,
		Schedule,
		Schedules,
		TourScheduleItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: TourScheduleItemView,
	  childViewContainer: "#schedule_list_item",
	  template: templates.tour_schedule_list,
	  onChildviewRenderCollection: function() {
	  	console.log('re-render schedule collection :'+JSON.stringify(this.collection));
		this.render();
	  },
	  //modelEvents: {
	  //  "change": "renderCollection"
	  //},


	}); 
});
