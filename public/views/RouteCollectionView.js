define([
	'marionette',
	'templates',
    'underscore',
    'models/Route',
    'collections/Routes',
    'views/RouteListItemView'
    
], function (Marionette, templates, _,RouteModel,Routes,RouteListItemView) {
	'use strict';

	return Marionette.CompositeView.extend({
	
	  childView: RouteListItemView,
	  childViewContainer: "tbody",
	  template: templates.route_list,

	});
});
