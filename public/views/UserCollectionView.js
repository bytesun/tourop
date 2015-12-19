define([
	'marionette',
	'templates',
    'underscore',
    'models/User',
    'collections/Users',
    'views/UserListItemView'
    
], function (Marionette, templates, _,
	User,
	Users,
	UserListItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
	
	  childView: UserListItemView,
	  childViewContainer: "tbody",
	  template: templates.user_list,
	  modelEvents: {
		  },

	  collectionEvents: {
		  'click .a_info_delete': 'delInfo'
	  },
	    delInfo:function(){
	    	console.log('delet info');
	    }
	});
});
