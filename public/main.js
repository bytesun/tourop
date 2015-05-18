require.config({
	paths: {
        'jquery'                : 'assets/lib/jquery.min',
        'underscore'            : 'assets/lib/underscore-min',         
        'backbone'              : 'assets/lib/backbone.min',
        'marionette'            : 'assets/lib/backbone.marionette.min',
        'syphon'                : 'assets/lib/backbone.syphon.min',
        'backbone.wreqr'        : 'assets/lib/backbone.wreqr.min',
        'backbone.babysitter'   : 'assets/lib/backbone.babysitter',
        'bootstrap'             : 'assets/lib/bootstrap.min',
        'text'                  : 'assets/lib/text',
        'tpl'                   : 'assets/lib/tpl',
        'parsley'               : 'assets/lib/parsley',
        'js-cookie'             : 'assets/lib/js.cookie'
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
//			deps: ['backbone', 'marionette', 'underscore']
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
        
		  /* alias away the sync method */
		  Backbone._sync = Backbone.sync;
		  // override original sync method to make header request contain csrf token
		  Backbone.sync = function(method, model, options, error){
		       options.beforeSend = function(xhr){
		           xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'));
		       };
		       /* proxy the call to the old sync method */
		       return Backbone._sync(method, model, options, error);
		  };        
    });

	app.start();
});
