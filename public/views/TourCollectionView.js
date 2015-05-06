define([
	'marionette',
	'templates',
    'underscore',
    'views/TourListItemView'
    
], function (Marionette, templates, _,TourListItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
	
	  childView: TourListItemView,
	  childViewContainer: "tbody",
	  template: templates.tour_list,

	});
});
