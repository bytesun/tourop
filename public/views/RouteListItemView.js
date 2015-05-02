define([
	'marionette',
	'templates',
    'underscore',
    'models/Route'
], function (Marionette, templates, _,RouteModel) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.route_item,
		model:RouteModel,
		tagName:'tr'
	});
});
