define([
	'marionette',
	'templates',
    'underscore',
    'models/Payable'
], function (Marionette, templates, _,
		PayableModel) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.payable_item,
		model:PayableModel,
		tagName:'tr'

	});
});
