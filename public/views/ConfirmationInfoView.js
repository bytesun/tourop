define([
	'marionette',
	'templates',
    'underscore',
    'syphon'
], function (Marionette, templates, _,
		Syphon) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.confirmation_info,
		regions:{
			passengerRegion:"#passenger-list-region"
		},
	   initialize: function () {
//	        _.bindAll(this,this.render);		   
//	        this.model.bind('change', this.render);
//	        this.model.bind('change', _.bind(this.render, this));
	    },
        events: {
        	'click .remark_label' : "showRemarkInput",
        	'click .btn_remark_save' : "saveRemark"
        		
        },
        showRemarkInput: function(){
        	console.log('show remark input');
        	$("#remark_area").html("<form><div class=\"form-group\"><textarea id=\"remark_area_input\" class=\"form-control\" rows=\"8\" >" +
        			"" + this.model.get("remark")+
        			"</textarea> " +
        			"	</div>  	<div class=\"form-group\">			" +
        			"<button class=\"btn btn-primary btn_remark_save\">Save</button> 	" +
        			"</div>  </form>	");
        },
        saveRemark:function(e){
        	e.preventDefault();
        	var remark = $("#remark_area_input").val();
        	this.model.set({remark:remark});
        	this.model.save();
        	this.render();
//        	app.navigate("#confirmation_info/"+this.model.get("_id"),true);
        }
        
	});
});
