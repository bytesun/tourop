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
		tagName:'tr',
		events:{
			'click .a_download_invoice':'download'
		},
		download: function(e){
			e.preventDefault();
			var doc = new jsPDF();
//			doc.save('invoice_'+this.model.get('no')+'.pdf');
		}

	});
});
