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
        	"click .btn_route_search":"searchByCode",
        },
        searchByCode: function(e){
        	var code = $("#search_code").val();
        	var route = $("#route_code").val();
        	var status = $("#tour_search_status").val();
        	var q = {status:status};
        	if(code == ""){
        		q.c=0;
        	}else{
        		q.c=code;
        	}
        	if(route != ""){
        		q.r=route;
        	}
        	console.log("tour query: "+JSON.stringify(q));
        	this.trigger("tours:search",q);
        },

	});
});
