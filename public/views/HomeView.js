/*global define */

define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.home,

        events: {
            'click #notify' : 'notify',
            'click #confirm' : 'showSampleConfirm'
        },


        notify: function(e) {
            app.commands.execute('app:notify', {
                type: 'warning',
                title: 'A Warning',
                description: 'Something important happened! Let the user know it.'
            });
        },
        showSampleConfirm: function(e) {
            app.commands.execute("app:dialog:confirm", {
                icon: 'info-sign',
                title: 'Action confirmation!',
                message: 'Are you sure to perform this serious action?',
                confirmNo: function() {
                    app.commands.execute('app:notify', {
                        type: 'warning',
                        title: 'You\'ve choosed No',
                        description: 'No problem. No action was taken.'
                    }
                )},
                confirmYes: function() {
                    app.commands.execute('app:notify', {
                        type: 'success',
                        title: 'You\'ve choosed Yes',
                        description: 'You\'ve agreed! Thanks :)'
                    }
                )}
            });
        }

	});
});
