define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
    'models/Setting'
], function (Marionette, templates, _,
		Syphon,
		Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.setting,
		model:Model,
		tagName:'div',
		events:{
			'click #btn_setting_save':'saveSetting'
		},
		saveSetting:function(e){
        	e.preventDefault();          	
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);
    	    this.model.save();
    	    app.execute("app:notify", {
                title: '',
                description: 'Setting information has been saved!'
            });
		}
	});
});
