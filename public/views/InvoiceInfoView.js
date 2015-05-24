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
//        	$('#invoice-info-template').wordExport();
        	
//        	var pdf = new jsPDF('p', 'pt', 'letter')
//
//        	// source can be HTML-formatted string, or a reference
//        	// to an actual DOM element from which the text will be scraped.
//        	, source = $('#invoice-info-template')[0]
//
//        	// we support special element handlers. Register them with jQuery-style
//        	// ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
//        	// There is no support for any other type of selectors
//        	// (class, of compound) at this time.
//        	, specialElementHandlers = {
//        	    // element with id of "bypass" - jQuery style selector
//        	    '#editor': function(element, renderer){
//        	        // true = "handled elsewhere, bypass text extraction"
//        	        return true
//        	    }
//        	}
//
//        	var margins = {
//        	    top: 80,
//        	    bottom: 60,
//        	    left: 40,
//        	    width: 522
//        	  };
//        	  // all coords and widths are in jsPDF instance's declared units
//        	  // 'inches' in this case
//        	pdf.fromHTML(
//        	    source // HTML string or DOM elem ref.
//        	    , margins.left // x coord
//        	    , margins.top // y coord
//        	    , {
//        	        'width': margins.width // max width of content on PDF
//        	        , 'elementHandlers': {}
//        	    },
//        	    function (dispose) {
//        	      // dispose: object with X, Y of the last line add to the PDF
//        	      //          this allow the insertion of new lines after html
//        	        pdf.save('Test.pdf');
//        	      },
//        	    margins
//        	  )
//        	
        	
 

            
            // can also be document.body

        }
        
	});
});
