define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
     'typeahead',
    'bloodhound', 
	'views/PayableCollectionView',
	'views/PayableListItemView',  
    'models/Payable',
    'views/PayableInfoView'	
], function (Marionette, templates, _,
		Syphon,
		Typeahead, Bloodhound,
		PayableCollectionView,
		PayableListItemView	,
				PayableModel,
		PayableInfoView) {
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
        	'click .btn_payable_search' : "searchPayables",
        	'click .btn_payable_pay' : "newPay"	
        },
        onShow: function(){
            			this.tours = new Bloodhound({
                             datumTokenizer: function (datum) {
                                 return Bloodhound.tokenizers.whitespace(datum.value);
                             },
                             queryTokenizer: Bloodhound.tokenizers.whitespace,
                             remote: {
                                 url: '/api/tours?c=%QUERY&status=Closed',
                                 wildcard: '%QUERY',
                                 filter: function (tours) {
                                     return $.map(tours, function (tour) {
                                         return {
                                             code: tour.code,
                                           };
                                     });
                                 }
                             }
                         });
                          
                         // Initialize the Bloodhound suggestion engine
                         this.tours.initialize();			
            			
                          
                         $("#tourcode").typeahead({
                               hint: true,
                               highlight: true,
                               minLength: 1
                             }, {
                             displayKey: 'code',
                             valueKey: 'name',
                             source: this.tours,
                         });   
                
                         $("#tourcode").on('typeahead:selected typeahead:autocompleted', function(event, datum) {
                              $("#tourcode").val(datum.code);
                         });           	
        },
		searchPayables: function(){
			var code = $("#tourcode").val();
			var self = this;
    		var fetchingitems = app.request("entities:payables",{tourcode:code});
        	$.when(fetchingitems).done(function(payables){
        		var payablelistView=new PayableCollectionView({collection:payables});
        		self.payablesRegion.show(payablelistView);
        	});				
		},
		newPay : function(e){
			e.preventDefault();
// 			var self = this;
			console.log('make payment by non-voucher ');
			
	     	var infoView = new PayableInfoView({
	                    model: new PayableModel(),
	                })
	       // infoView.on('payable:payit',function(){
	       // 	console.log('payable:payit event is triggered!'+JSON.stringify(self.model));
	       // 	self.trigger("renderCollection");
	       // });
	     	app.dialog.show(infoView);
		},		
        
	});
});
