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
        	'click .a_info_edit': 'editInfo',
        	'click .a_info_delete': 'delInfo'   
        },
        editInfo : function(e){
        // 	app.navigate("info_new");
        // 	var infoView = new InfoAuthorView({
        // 		model:this.model
        // 	});
        // 	app.main.show(infoView);
        	

     	var infoView = new InfoAuthorView({
                    model: this.model,
                })
     	app.dialog.show(infoView);
        	 
        },
        delInfo : function(e){
        	var self = this;
        	app.execute('app:dialog:confirm',
                    	{title:'Confirm!',
                    	message:'You will delete <b>\"'+self.model.get('name')+"\"</b>! Please confirm it first.",
        		confirmNo: function(){
        			console.log('cancel deleting operation');
        		},
        		confirmYes:function(){
        			self.model.destroy();		
        		}});
//        	
        }

	});
});
