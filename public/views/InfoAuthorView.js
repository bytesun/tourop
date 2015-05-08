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
        	"keyup .telphone":"formatTel",
        	"click .btn_info_save": "saveInfo"
        },
        formatTel: function(e){
        	console.log('fire keyup event');
//        	var input = $("#telphone").val();
//        	
//        	$(".telphone").val("hello");
        },
        saveInfo: function(e){
        	e.preventDefault();
       	 
    	    var data = Syphon.serialize(this);
    	    this.model.set(data);

    	    this.model.save();
    	    console.log('code:'+this.model.get("code"));
    	    console.log('type:'+this.model.get("type"));
    	    //redirect list page
    	    app.navigate("info/"+this.model.get("code")+"/"+this.model.get("type"),true);        	
        }
	});
});
