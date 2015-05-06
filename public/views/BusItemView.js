define([
	'marionette',
	'templates',
    'underscore',
    'models/Bus'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_bus_item,
		model:Model,
		tagName:'div'
        
       
	});
});
