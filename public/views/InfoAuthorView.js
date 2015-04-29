define([
	'marionette',
	'templates',
    'underscore',
    'syphon'
], function (Marionette, templates, _,
		Syphon) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.info_info,

        events: {
        	"submit form": "saveInfo"
        },
        saveInfo: function(e){
        	e.preventDefault();
       	 
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);
    	    console.log('save info: '+data);
    	    this.model.save();
    	    
    	    //redirect list page
    	    app.navigate("info",true);        	
        }
	});
});
