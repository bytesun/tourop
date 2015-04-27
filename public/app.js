/*global define */

define([
    'backbone',
	'marionette',
	'models/SessionModel',
    'regions/notification',
    'regions/dialog',
    'views/HomeView',
    'views/LoginView'
], function (Backbone, Marionette,SessionModel, NotifyRegion, DialogRegion,
		HomeView,
		LoginView) {
	'use strict';

	var app = new Marionette.Application();

	
	app.addRegions({
		top: 'body',
		main: '#main',
		footer: '#footer',
        notification: {
            selector: "#notification",
            regionType: NotifyRegion
        },
        dialog: {
            selector: "#dialog",
            regionType: DialogRegion
        }
	});
//	app.session = new SessionModel({});
	   // Check the auth status upon initialization,
    // before rendering anything or matching routes
//    app.session.checkAuth({
//
//        // Start the backbone routing once we have captured a user's auth status
//        complete: function(){
//
//            // HTML5 pushState for URLs without hashbangs
//            var hasPushstate = !!(window.history && history.pushState);
//            if(hasPushstate) Backbone.history.start({ pushState: true, root: '/tour' });
//            else Backbone.history.start();
//
//        }
//    });	
	app.addInitializer(function () {
		app.main.show(new HomeView());

	});

    app.on("start", function(options){
        if (Backbone.history){
            Backbone.history.start();
        }
    });



    /**
     * Sample JSON Data
     * app.commands.execute("app:notify", {
     *           type: 'warning'    // Optional. Can be info(default)|danger|success|warning
     *           title: 'Success!', // Optional
     *           description: 'We are going to remove Team state!'
     *       });
     */
    app.commands.setHandler("app:notify", function(jsonData) {
        require(['views/NotificationView'], function(NotifyView) {
            app.notification.show(new NotifyView({
                model: new Backbone.Model(jsonData)
            }));
        });
    });

    /**
     * @example
     * app.commands.execute("app:dialog:simple", {
     *           icon: 'info-sign'    // Optional. default is (glyphicon-)bell
     *           title: 'Dialog title!', // Optional
     *           message: 'The important message for user!'
     *       });
     */
    app.commands.setHandler("app:dialog:simple", function(data,ModalTemplate) {
    	
        require(['views/DialogView', 'models/Dialog'],
            function(DialogView, DialogModel) {

                app.dialog.show(new DialogView({
                    template: ModalTemplate,
                    model: new DialogModel(data)
                }));
            });
    });

    /**
     * @example
     * app.commands.execute("app:dialog:confirm", {
     *           icon: 'info-sign'    // Optional. default is (glyphicon-)bell
     *           title: 'Dialog title!', // Optional
     *           message: 'The important message for user!'
     *           'confirmYes': callbackForYes, // Function to execute of Yes clicked
     *           'confirmNo': callbackForNo, // Function to execute of No clicked
     *       });
     */
    app.commands.setHandler("app:dialog:confirm", function(data) {
        require(['views/DialogView', 'models/Dialog', 'tpl!templates/confirmModal.html'],
            function(DialogView, DialogModel, ModalTpl) {

                app.dialog.show(new DialogView({
                    template: ModalTpl,
                    model: new DialogModel(data),
                    events: {
                        'click .dismiss': 'dismiss',
                        'click .confirm_yes': data.confirmYes,
                        'click .confirm_no': data.confirmNo
                    }
                }));
            });
    });

	return window.app = app;
});