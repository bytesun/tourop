define([
	'marionette',
	'templates',
    'underscore',
    'models/Tourist'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_tourist_item,
		model:Model,
		tagName:'div',
		initialize : function(options) {
			this.model.set({groupno: options.groupno,
				route:options.route});
		}

	});
});
