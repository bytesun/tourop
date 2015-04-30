define([
	'marionette',
	'templates',
    'underscore',
    'controllers/route',
    'syphon'
], function (Marionette, templates, _,route,
		Syphon) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.route_info,

        events: {
        	"submit form": "saveRoute"
        },
        saveRoute: function(e){
        	e.preventDefault();
          	
    	    var data = Syphon.serialize(this);
    	    console.log('save route data:'+JSON.stringify(data));
    	    this.model.set(data);

    	    this.model.save();

    	    app.navigate("route/"+this.model.get("code"),true);    
        }

	});
});
