define([
	'marionette',
	'templates',
    'underscore',
    'syphon'
], function (Marionette, templates, _,
		Syphon) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.payable_info,

        events: {
        	"click .confirm_yes": "makepayment",
        	'click .dismiss': 'dismiss',
        	'change .amount' : 'caltotal',
        	'change .tax' : 'caltotal'
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
