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
			"keyup .telephone":"formatTel",
			'click #btn_setting_save':'saveSetting'
		},
		formatTel: function(e){
        	e.preventDefault();
        	
        	var input = $(e.target).val();
        	var length = input.length>13?13:input.length;
        	var c = '';
        	var out = '';
        	for(var i=0;i<length;i++){
        		c = input.substring(i,i+1);
        		if(i==0 && c != '('){
        			out = '(';
        		}else if(i == 4 && c != ')'){
        			out = out+')';
        		}else if(i == 8 && c != '-'){
        			out = out+'-';
        		}
        		out = out+c;
        	}
        	
        	$(e.target).val(out);
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
