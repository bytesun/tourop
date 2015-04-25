require.config({
	paths: {
        'jquery'                : 'assets/lib/jquery.min',
        //'jquery-ui'             : '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
        'underscore'            : 'assets/lib/underscore-min',         // load lodash instead of underscore (faster + bugfixes)
        'backbone'              : 'assets/lib/backbone',
        'marionette'            : 'assets/lib/backbone.marionette',
        'bootstrap'             : 'assets/lib/bootstrap.min',
        'text'                  : 'assets/lib/text',
        'tpl'                   : 'assets/lib/tpl',
        'parsley'               : 'assets/lib/parsley'
	},

	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},

		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		},

        bootstrap: {
            deps: ['jquery']
        }

	},
    waitSeconds: 60
});

require([
	'app',
    'modules/Pages',
    'jquery',
	'bootstrap'
], function (app, PagesModule) {
	'use strict';

    app.addInitializer(function() {

        PagesModule.start();
    });

	app.start();
});
