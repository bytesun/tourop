define([
	'marionette',
	'templates',
    'underscore',
    'models/Information',
    'views/InfoAuthorView'
    
], function (Marionette, templates, _,InfoModel,InfoAuthorView) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.info_item,
		model:InfoModel,
		tagName:'tr',
        events: {
        	'click .a_info_edit': 'editInfo'        	
        },
        editInfo : function(e){
        	app.navigate("info_new");
        	var infoView = new InfoAuthorView({
        		model:this.model
        	});
        	app.main.show(infoView);
        	 
        }

	});
});
