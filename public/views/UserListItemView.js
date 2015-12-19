define([
	'marionette',
	'templates',
    'underscore',
    'models/User',
    'views/UserAuthorView'
    
], function (Marionette, templates, _,
                User,UserAuthorView) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.user_item,
		model:User,
		tagName:'tr',
        events: {
        	'click .a_edit_user': 'editInfo',
        	 
        },
        editInfo : function(e){

        	var userInfoView = new UserAuthorView({
                    model: this.model,
                })
        	app.dialog.show(userInfoView);
        	 
        },


	});
});
