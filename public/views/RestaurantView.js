define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.restaurant,

        events: {
//            'click #notify' : 'notify',
//            'click #modal' : 'showSampleModal',
//            'click #confirm' : 'showSampleConfirm'
        }

	});
});
