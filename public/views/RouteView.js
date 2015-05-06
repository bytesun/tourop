define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
    'views/RouteCollectionView'
], function (Marionette, templates, _,
		Syphon,
		RouteCollectionView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.route,
		regions:{
			routeListRegion:"#route-list-region"
		},
        events: {
        	"change .search_code" : "searchByCode",
        	"click .btn_route_search":"searchByCode",
        	"click .btn_route_new":"newRoute",
        },
       
        searchByCode: function(e){
        	var query = $("#search_code").val();
//        	var fetchingitems = app.request("entities:routes",{c:query});
//        	$.when(fetchingitems).done(function(routes){
//        			        		
//	        	var routeCollectionView = new RouteCollectionView({
//	        		collection:routes
//	        	});
//        		this.routeListRegion.show(routeCollectionView);
//        	});	        	
        	app.navigate('route/'+query,true);
        },
        newRoute: function(e){
        	app.navigate("route_info",true);
        }

	});
});
