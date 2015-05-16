define([
	'marionette',
	'templates',
    'underscore',
    'models/Invoice'
], function (Marionette, templates, _,
		InvoiceModel) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.invoice_item,
		model:InvoiceModel,
		tagName:'tr'

	});
});
