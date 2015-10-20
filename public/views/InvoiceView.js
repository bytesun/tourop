define([
	'marionette',
	'templates',
    'underscore',
     'typeahead',
    'bloodhound',    
], function (Marionette, templates, _,
	Typeahead, Bloodhound) {
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
	onShow: function(){
		this.partners = new Bloodhound({
                  datumTokenizer: function (datum) {
                      return Bloodhound.tokenizers.whitespace(datum.value);
                  },
                  queryTokenizer: Bloodhound.tokenizers.whitespace,
                  remote: {
                      url: '/api/infos?c=%QUERY&t=A',
                      wildcard: '%QUERY',
                      filter: function (infos) {
                          return $.map(infos, function (info) {
                              return {
                                  code: info.code,
                                };
                          });
                      }
                  }
              });
              
              // Initialize the Bloodhound suggestion engine
              this.partners.initialize();			
			
              
              $("#agencycode").typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                  }, {
                  displayKey: 'code',
                  valueKey: 'name',
                  source: this.partners,
              });   
    
              $("#agencycode").on('typeahead:selected typeahead:autocompleted', function(event, datum) {
                   $("#agencycode").val(datum.code);
              });   
	},    
        searchByCode: function(e){
        	var tourcode = $("#tourcode").val();
        	var invoiceno = $("#invoiceno").val();
        	var agencycode = $('#agencycode').val();
        	this.trigger("invoice:search",tourcode,invoiceno,agencycode);
//        	app.navigate('invoice/'+query,true);
        },

	});
});
