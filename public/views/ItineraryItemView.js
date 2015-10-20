define([
	'marionette',
	'templates',
    'underscore',
    'models/Schedule'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.route_itinerary_item,
		model:Model,
		tagName:'div',
        events: {
        	'mouseenter .typeahead' :'fetchScenic',
        	'click .btn_add_scenic' :'addScenic',

        },
		initialize : function() {
			  this.listenTo(this.model, 'change', this.render);
		},        
     
        addScenic: function(){
        	var sa = this.model.get('scenic');
        	console.log('scenic '+JSON.stringify(sa));
        	sa[sa.length]={
        			name:'',
    				telephone:'',
    				address:'',
    				city:'',
    				province:'',
    				payment:''
        			
        	}
        	this.model.set({
        		note:this.model.get('note')+'',
        		scenic:sa
        	})
        },
        fetchScenic : function(e){
        	var inputid = e.target.id;
        	var index = inputid.substring(12);
        	var code = $("#"+inputid).val();
        	//check admission first
        	var fetchingitem = app.request("information:entity:fetch",code);
        	$.when(fetchingitem).done(function(info){
        		if(info != null){
                	$("#"+inputid).val(info.get('name'));
                	$("#scenic_telephone_"+index).val(info.get('telphone'));
                	$("#scenic_payment_"+index).val(info.get('payment'));
                	$("#scenic_address_"+index).val(info.get('address')+", " +info.get('city'));
//                	$("#"+inputid).before("<input class=\"form-control\" id=\"adm"+day+"_"+index+"\" value=\""+inputstr+"\"><br>");
//                	$("#"+inputid).val("");
//                	$("#admindex_"+day).val(parseInt(index)+1);
        		}
        	});
        	

        },
     

        

	});
});
