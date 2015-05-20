define([
	'marionette',
	'templates',
    'underscore',
    'syphon',

    'html2pdf'
], function (Marionette, templates, _,
		Syphon,
		html2pdf) {
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
        	'click .btn_remark_save' : 'saveRemark',
        	'click .a_download' : 'download'	
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
        },
        download: function(e){
        	console.log('download invoice');
//        	var doc = new jsPDF('p', 'in', 'letter');
        	
//            var source = $('#invoice-info-template').first();
//            var specialElementHandlers = {
//                '#editor': function(element, renderer) {
//                    return true;
//                }
//            };
//
//            doc.fromHTML(
//                source, // HTML string or DOM elem ref.
//                0.5,    // x coord
//                0.5,    // y coord
//                {
//                    'width': 7.5, // max width of content on PDF
//                    'elementHandlers': specialElementHandlers
//                });    	
//        	
//
//        	doc.save('text.pdf');
        	var pdf = new jsPDF('p', 'pt', 'letter');
            var canvas = pdf.canvas;
            canvas.height = 72 * 11;
            canvas.width= 72 * 8.5;;
            
            // can also be document.body
            var html = '<html><body>Hello <strong> World</strong></body></html>';
            html2pdf(html, pdf, function(pdf) {        
                    pdf.output('dataurlnewwindow');        
            });
        }
        
	});
});
