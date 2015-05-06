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
        	"change .search_code" : "searchByCode",
        	"click .btn_route_search":"searchByCode",
        },
        searchByCode: function(e){
        	var query = $("#search_code").val();
        	app.navigate('tour/'+query,true);
        },

	});
});
