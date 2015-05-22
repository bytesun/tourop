define([
	'marionette',
	'templates',
    'underscore',
    'models/Partner'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.partner_item_scenic,
		model:Model,
		tagName:'div',
		initialize : function(options) {
			this.model.set({day: options.day});
		}

	});
});
