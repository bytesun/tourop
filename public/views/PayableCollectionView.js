define([
	'marionette',
	'templates',
    'underscore',
    'views/PayableListItemView'
    
], function (Marionette, templates, _,PayableListItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
	
	  childView: PayableListItemView,
	  childViewContainer: "tbody",
	  template: templates.payable_list,
	  onChildviewRenderCollection: function(childView) {
	  	
			console.log('remove payable model  from collection: '+JSON.stringify(this.collection));
			this.collection.remove(childView.model);
			
			// this.render();
	  },
	});
});
