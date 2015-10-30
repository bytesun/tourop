define([
	'marionette',
	'templates',
    'underscore',
    'models/Payable',
    'views/PayableInfoView'
], function (Marionette, templates, _,
		PayableModel,
		PayableInfoView) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.payable_item,
		model:PayableModel,
		tagName:'tr',
		events : {
			'click .btn_pay':'payit'
			
		},
		payit : function(e){
			e.preventDefault();
			var self = this;
			console.log('make payment for :'+this.model.get('payee')+" in tour "+this.model.get('tour'));
			
	     	var infoView = new PayableInfoView({
	                    model: this.model,
	                })
	        infoView.on('payable:payit',function(){
	        	console.log('payable:payit event is triggered!'+JSON.stringify(self.model));
	        	self.trigger("renderCollection");
	        });
	     	app.dialog.show(infoView);
		},

	});
});
