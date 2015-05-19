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
        	var length = input.length;
        	var c = '';
        	var out = '';
        	for(var i=0;i<length;i++){
        		c = input.substring(i,i+1);
        		if(i==0 && c != '('){
        			out = '(';
        		}else if(i == 4 && c != ')'){
        			out = out+') ';
        		}else if(i == 9 && c != '-'){
        			out = out+'-';
        		}
        		out = out+c;
        	}
        	
        	$(e.target).val(out);
        },
		saveSetting:function(e){
        	e.preventDefault();          	
    	    var data = Syphon.serialize(this);
    	    var self = this;
    	    this.model.save({
    	    	tourcom:{
    	    		name:data.name,
    	    		regno:data.regno,
    	    		contact:data.contact,
    	    		email:data.email,
    	    		telephone:data.telephone,
    	    		fax:data.fax,
    	    		address:data.address,
    	    		city:data.city,
    	    		province:data.province,
    	    		country:data.country,
    	    		postcode:data.postcode

    	    	},
    	    	finance:{
    	    		commission:data.commission
    	    	}
    	    },{
    	    	success:function(setting){
    	    		app.setting=new Setting(setting);
    	    		console.log('update setting :'+JSON.stringify(app.setting));
    	    	},
    	    	error:function(){
    	    		
    	    	}
    	    });
    	    console.log('save setting :'+JSON.stringify(this.model));
    	    
    	    app.notify('','Setting information has been saved!','alert-info');

		}
	});
});
