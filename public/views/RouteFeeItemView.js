define([
	'marionette',
	'templates',
    'underscore',
    'models/FareType'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.route_faretype_item,
		model:Model,
		tagName:'div',
        events: {

        },
      

	});
});
