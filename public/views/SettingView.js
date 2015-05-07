define([
	'marionette',
	'templates',
    'underscore',
    'models/Setting'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.setting,
		model:Model,
		tagName:'div'
	});
});
