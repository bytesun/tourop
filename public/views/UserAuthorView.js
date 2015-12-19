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
		template: templates.user_info,
	
        events: {
        	"click .confirm_yes": "saveUser"
        },
        
        saveUser: function(e){
        	e.preventDefault();
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);
    	    this.model.save();
    	    app.notify('','New user information has been saved!','alert-info');
    	    app.navigate("users/",true);
        }
	});
});
