define([
	'marionette',
	'templates',
    'underscore',
    'views/InvoiceListItemView'
    
], function (Marionette, templates, _,InvoiceListItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
	
	  childView: InvoiceListItemView,
	  childViewContainer: "tbody",
	  template: templates.invoice_list,

	});
});
