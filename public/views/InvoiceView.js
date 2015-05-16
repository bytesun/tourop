define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.invoice,
		regions:{
			invoiceListRegion:"#invoice-list-region"
		},
        events: {
//            'click #notify' : 'notify',
//            'click #modal' : 'showSampleModal',
//            'click #confirm' : 'showSampleConfirm'
        	"change .search_code" : "searchByCode",
        	"click .btn_invoice_search":"searchByCode",
        },
        searchByCode: function(e){
        	var query = $("#tourcode").val();
        	app.navigate('invoice/'+query,true);
        },

	});
});
