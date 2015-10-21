define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
     'typeahead',
    'bloodhound', 
	'views/PayableCollectionView',
	'views/PayableListItemView',    
], function (Marionette, templates, _,
		Syphon,
		Typeahead, Bloodhound,
		PayableCollectionView,
		PayableListItemView		) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.payable,
		regions:{
			payablesRegion:"#payable-list-region"
		},
	   initialize: function () {
//	        _.bindAll(this,this.render);		   
//	        this.model.bind('change', this.render);
//	        this.model.bind('change', _.bind(this.render, this));
	    },
        events: {
        	// 'click .remark_label' : "showRemarkInput",
        	'click .btn_payable_search' : "searchPayables"
        		
        },
        onShow: function(){
			// this.partners = new Bloodhound({
   //               datumTokenizer: function (datum) {
   //                   return Bloodhound.tokenizers.whitespace(datum.value);
   //               },
   //               queryTokenizer: Bloodhound.tokenizers.whitespace,
   //               remote: {
   //                   url: '/api/infos?c=%QUERY&t=A',
   //                   wildcard: '%QUERY',
   //                   filter: function (infos) {
   //                       return $.map(infos, function (info) {
   //                           return {
   //                               code: info.code,
   //                             };
   //                       });
   //                   }
   //               }
   //           });
              
   //           // Initialize the Bloodhound suggestion engine
   //           this.partners.initialize();			
			
              
   //           $("#agencycode").typeahead({
   //                 hint: true,
   //                 highlight: true,
   //                 minLength: 1
   //               }, {
   //               displayKey: 'code',
   //               valueKey: 'name',
   //               source: this.partners,
   //           });   
    
   //           $("#agencycode").on('typeahead:selected typeahead:autocompleted', function(event, datum) {
   //                $("#agencycode").val(datum.code);
   //           });           	
        },
		searchPayables: function(){
			var code = $("#tourcode").val();
			var self = this;
    		var fetchingitems = app.request("entities:payables",{tourcode:code});
        	$.when(fetchingitems).done(function(payables){
        		var payablelistView=new PayableCollectionView({collection:payables});
        		self.payablesRegion.show(payablelistView);
        	});				
		}
        
	});
});
