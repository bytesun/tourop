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

	});
});
