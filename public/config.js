/**
 * @desc        configure aliases and dependencies
 */

if (typeof DEBUG === 'undefined') DEBUG = true;

require.config({

    baseUrl: '/',

    paths: {
        'jquery'                : 'assets/lib/jquery.min',
        'underscore'            : 'assets/lib/underscore-min',         // load lodash instead of underscore (faster + bugfixes)
        'backbone'              : 'assets/lib/backbone',
        'marionette'            : 'https://cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.4.1/backbone.marionette.min',
        'bootstrap'             : 'assets/lib/bootstrap.min',
        'text'                  : 'assets/lib/text',
        'tpl'                   : 'assets/lib/tpl',
        'parsley'               : 'assets/lib/parsley'
    },

    // non-AMD lib
    shim: {
        'underscore'            : { exports  : '_' },
        'backbone'              : { deps : ['underscore', 'jquery'], exports : 'Backbone' },
		'marionette'            : {exports: 'Backbone.Marionette',deps: ['backbone']},        
        'bootstrap'             : { deps : ['jquery'], exports : 'Bootstrap' },
        'parsley'               : { deps: ['jquery'] }
    }

});

require(['main']);           // Initialize the application with the main application file.