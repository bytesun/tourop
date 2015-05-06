define([
	'marionette',
	'templates',
    'underscore',
    'models/Information',
    'collections/Informations',
    'views/InfoListItemView'
    
], function (Marionette, templates, _,infoModel,Informations,InfoListItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
	
	  childView: InfoListItemView,
	  childViewContainer: "tbody",
	  template: templates.info_list,
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
