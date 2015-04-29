define([
	'marionette',
	'templates',
    'underscore',
    'models/Information'
    
], function (Marionette, templates, _,InfoModel) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.info_item,
		model:InfoModel,
		tagName:'tr',
        events: {
        	'click .a_info_edit': 'editInfo',
        	'click .a_info_delete': 'delInfo'
        },
        editInfo : function(e){
        	console.log('edit info :'+this.model.get("code"));
        	this.trigger("information:edit",this.model);
        	 
        },
        delInfo:function(){
        	console.log('delet info');
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure deleting this information?'
        	});        	
        }

	});
});
