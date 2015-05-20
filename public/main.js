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
        'js-cookie'             : 'assets/lib/js.cookie',
        'jspdf'                 : 'assets/lib/jspdf.debug',
        'html2pdf'              : 'assets/lib/html2pdf'
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
        },
        'assets/lib/plugins/standard_fonts_metrics':{
            deps:[
	            'jspdf'
            ]
        },

        'assets/lib/plugins/split_text_to_size':{
            deps:[
	            'jspdf'
            ]
        },

        'assets/lib/plugins/annotations' : {
        	deps:[
            'jspdf',
            'plugins/standard_fonts_metrics',
            'plugins/split_text_to_size'
            ]
        },

        'assets/lib/plugins/outline':{
            deps:[
	            'jspdf'
            ]
        },

        'assets/lib/plugins/addimage':{
            deps:[
	            'jspdf'
            ]
        },

        'assets/lib/plugins/png_support':{
            deps:[
	            'jspdf',
	            'libs/png_support/png',
	            'libs/png_support/zlib'
            ]
        },

        'assets/lib/plugins/from_html':{
            deps:[
	            'jspdf'
            ]
        },

        'assets/lib/plugins/context2d':{
            deps:[
	            'jspdf',
	            'plugins/png_support',
	            'plugins/addimage',
	            'libs/css_colors'
            ]
        },

        'assets/lib/plugins/html2canvas':{
            deps:[
	            'jspdf'
            ]
        },

        'assets/lib/plugins/canvas' : {
            deps:[
	            'jspdf'
            ]
        },
        'assets/lib/html2pdf' : {
        	deps:[
            'jspdf',
            'assets/lib/plugins/standard_fonts_metrics',
            'assets/lib/plugins/split_text_to_size',
            'assets/lib/plugins/png_support',
            'assets/lib/plugins/context2d',
            'assets/lib/plugins/canvas',
            'assets/lib/plugins/annotations',

            'assets/lib/plugins/html2canvas'
            ]
        },

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
