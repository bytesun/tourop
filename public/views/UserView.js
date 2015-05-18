define([
	'marionette',
	'templates',
    'underscore',
    'syphon'
    
], function (Marionette, templates, _,
		Syphon
		) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.user,
	
        events: {
        	"click .btn_user_save": "saveUser"
        },
        
        saveUser: function(e){
        	e.preventDefault();
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);
    	    console.log('save user info :'+JSON.stringify(this.model));
    	    this.model.save();
        }
	});
});
