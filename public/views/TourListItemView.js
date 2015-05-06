define([
	'marionette',
	'templates',
    'underscore',
    'models/Tour'
], function (Marionette, templates, _,
		TourModel) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_item,
		model:TourModel,
		tagName:'tr'

	});
});
