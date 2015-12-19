define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
         'typeahead',
    'bloodhound', 
    
], function (Marionette, templates, _,
		Syphon,
		Typeahead, Bloodhound) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.payable_info,

        events: {
        	"click .confirm_yes": "makepayment",
        	'click .dismiss': 'dismiss',
        	'change .amount' : 'caltotal',
        	'change .tax' : 'caltotal'
        },
        onShow: function(){
            //initialize payee
            			this.payees = new Bloodhound({
                             datumTokenizer: function (datum) {
                                 return Bloodhound.tokenizers.whitespace(datum.value);
                             },
                             queryTokenizer: Bloodhound.tokenizers.whitespace,
                             remote: {
                                 url: '/api/partners?c=%QUERY&t=ALL',
                                 wildcard: '%QUERY',
                                 filter: function (payees) {
                                     return $.map(payees, function (payee) {
                                         return {
                                             code: payee.code,
                                             name: payee.name
                                           };
                                     });
                                 }
                             }
                         });
                          
                         // Initialize the Bloodhound suggestion engine
                         this.payees.initialize();			
            			
                          
                         $("#payeecode").typeahead({
                               hint: true,
                               highlight: true,
                               minLength: 1
                             }, {
                             displayKey: 'code',
                             valueKey: 'name',
                             source: this.payees,
                         });   
                
                         $("#payeecode").on('typeahead:selected typeahead:autocompleted', function(event, datum) {
                              $("#payeecode").val(datum.code);
                              $("#payeename").val(datum.name);
                              
                         });  
                         
                        //initialize tours
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
            			
                          
                         $("#tcode").typeahead({
                               hint: true,
                               highlight: true,
                               minLength: 1
                             }, {
                             displayKey: 'code',
                             valueKey: 'name',
                             source: this.tours,
                         });   
                
                         $("#tcode").on('typeahead:selected typeahead:autocompleted', function(event, datum) {
                              $("#tcode").val(datum.code);
                              $("#tname").val(datum.name);
                         });           	
        },
        dismiss: function(e) {
            e.preventDefault();
            this.trigger('dialog:close');
        },

        makepayment: function(e){
        	e.preventDefault();
       	 
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);
    	    this.model.set({},{validate: true})
    	    if (!this.model.isValid()) {
        		app.notify('Error',this.model.validationError,'alert-danger');
        		
        	}else{
        	     this.model.set({'stat':9});
        	     console.log('ready to save payable data:'+JSON.stringify(this.model));
        		 this.model.save();
        		 
        		 this.trigger("payable:payit");
        		 app.notify('Success','This payment has been processed!','alert-success');
        	}
        },
        caltotal : function(e){
            e.preventDefault();
            var amount = $('#payable_amount').val();
            var tax = $('#payable_tax').val();
            var total = Number(amount)+Number(tax);
            $('#payable_total').val(total);
        }
	});
});
