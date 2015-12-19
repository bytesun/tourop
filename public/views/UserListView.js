define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
    'views/UserAuthorView',
    'models/User',
    'views/UserCollectionView'

], function (Marionette, templates, _,
		Syphon,
		UserAddView,
		User,
		UserCollectionView
        ) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.user,
		regions:{
			userListRegion:"#user-list-region"
		},
        events: {
        	'click .btn_add_user' : "newUser"	
        },
        onShow: function(e){
        	var self = this;
			var fetchingitems = app.request("entities:users",{});
        	$.when(fetchingitems).done(function(users){
				console.log('user list: '+JSON.stringify(users));        			        		
	        	var userlistView = new UserCollectionView({
	        		collection:users
	        	});
	        	self.userListRegion.show(userlistView);
        	});	        	
        },
		newUser : function(e){
			e.preventDefault();	
            var newUserView = new UserAddView({
	                    model: new User(),
	                })
	     	app.dialog.show(newUserView);			
		},		
        
	});
});
