define([
	'marionette',
	'templates',
    'underscore'
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.tour,
		regions:{
			tourListRegion:"#tour-list-region"
		},
        events: {
//        	"change .search_code" : "searchByCode",
//        	'change tour_search_status': 'searchByStatus',
        	"click .btn_route_search":"searchByCode",
        },
        searchByCode: function(e){
        	var code = $("#search_code").val();
        	if(code == "")code=0;
        	
        	app.navigate('tour/'+code+"/"+$("#tour_search_status").val(),true);
        },

	});
});
