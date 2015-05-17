define([
	'marionette',
	'templates',
    'underscore',
    'syphon'
], function (Marionette, templates, _,
		Syphon) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.invoice_info,
		regions:{
			passengerRegion:"#passenger-list-region"
		},
	   initialize: function () {
   //	        this.model.bind('change', this.render);
	    },
        events: {
        	'click b#label_remark' : 'showRemarkInput',
        	'click .btn_remark_save' : 'saveRemark'
        		
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
        }
        
	});
});
