/*global define */

define([
    'backbone',
	'marionette',
//	'wreqr',

	'models/SessionModel',
    'regions/notification',
    'regions/dialog',
    'models/Setting'

], function (Backbone, Marionette,
//		Wreqr,
		SessionModel, NotifyRegion, 
		DialogRegion,
		Setting) {
	'use strict';

	var app = new Marionette.Application();
	app.setting = new Setting();
//	var commands = new Backbone.Wreqr.Commands();
	
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


	app.navigate = function(route,options){
		options || (options = {});
		Backbone.history.navigate(route, options);
	}	

    app.on("start", function(options){
    	var fetchingitem = app.request("setting:entity");
    	$.when(fetchingitem).done(function(item){
    		if(item !=null){
    			app.setting = item;
    	    	console.log('loading setting :'+JSON.stringify(app.setting));
    		}
    	});

        if (Backbone.history){
            Backbone.history.start();
            app.navigate("tour",true);
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
//    app.commands = Wreqr.Commands();
    app.commands.setHandler("app:notify", function(jsonData) {
        require(['views/NotificationView'], function(NotifyView) {
            app.notification.show(new NotifyView({
                model: new Backbone.Model(jsonData)
            }));
        });
    });
    app.notify = function(title, text, klass) {
    	console.log("calling notify function");
        $("#notification").removeClass("alert-danger alert-warning alert-success alert-info");
        $("#notification").addClass(klass);
        $("#notification").html('<button class="close" data-dismiss="alert">×</button><strong>' + title + '</strong> ' + text);
        $("#notification").show('fast');
        setTimeout(function() {
            $("#notification").hide();
        }, 7000 );
    }	
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