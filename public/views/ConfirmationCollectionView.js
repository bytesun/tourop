define([
	'marionette',
	'templates',
    'underscore',
    'views/ConfirmationListItemView'
    
], function (Marionette, templates, _,ConfirmationListItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
	
	  childView: ConfirmationListItemView,
	  childViewContainer: "tbody",
	  template: templates.confirmation_list,

	});
});
