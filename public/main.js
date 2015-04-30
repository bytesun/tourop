require.config({
	paths: {
        'jquery'                : 'assets/lib/jquery.min',
        'underscore'            : 'assets/lib/underscore-min',         // load lodash instead of underscore (faster + bugfixes)
        'backbone'              : 'assets/lib/backbone.min',
        'marionette'            : 'assets/lib/backbone.marionette.min',
        'syphon'                : 'assets/lib/backbone.syphon.min',
//        'wreqr'                 : '/backbone.wreqr',
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
		syphon: {
			exports: 'Backbone.Syphon',
			deps: ['backbone']
		},
//		wreqr : {
//			exports: 'Backbone.Wreqr',
//			deps: ['backbone']
//			
//		},
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
