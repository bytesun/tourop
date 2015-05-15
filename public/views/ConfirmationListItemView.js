define([
	'marionette',
	'templates',
    'underscore',
    'models/Confirmation'
], function (Marionette, templates, _,
		ConfirmationModel) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.confirmation_item,
		model:ConfirmationModel,
		tagName:'tr'

	});
});
