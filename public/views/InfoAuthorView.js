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
        	"keyup .telephone":"formatTel",
        	"keyup .postcode":"formatPostcode",
        	"click .btn_info_save": "saveInfo"
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
        formatPostcode : function(e){
        	e.preventDefault();
        	
        	var input = $(e.target).val();
        	var c = '';
        	var out = '';
        	for(var i=0;i<input.length;i++){
        		c = input.substring(i,i+1);
        		if(i==3 && c != ' '){
        			out = out+' ';
        		}
        		out = out+c;
        	}
        	
        	$(e.target).val(out);	
        },
        saveInfo: function(e){
        	e.preventDefault();
       	 
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);

    	    this.model.save();

    	    //redirect list page
    	    app.navigate("info/"+this.model.get("code")+"/"+this.model.get("type"),true);        	
        }
	});
});
