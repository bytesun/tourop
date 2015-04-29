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
//	  templateHelpers: function() {
//		    return { items: this.collection.toJSON() };
//	  },
	  modelEvents: {
//		    "change": "modelChanged"
		  },

		  collectionEvents: {
//		    "add": "modelAdded"
		  }
	});
});
