define([
	'marionette',
	'templates',
    'underscore',
    'controllers/route',
    'syphon'
], function (Marionette, templates, _,route,
		Syphon) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.route,
		regions:{
			routeListRegion:"#route-list-region"
		},
        events: {
        	"submit form": "saveRoute",
        	"change .search_code" : "searchByCode",
        	"click .btn_route_search":"searchByCode"
        },
        saveRoute: function(e){
        	e.preventDefault();
          	
    	    var data = Syphon.serialize(this);
    	    this.model.save(data,{
    	    	success:function(model, response, options){
    	    		app.navigate("route_info/"+model.get("_id"),true);    
    	    	}
    	    });

    	    
        },
        searchByCode: function(e){
        	var searchcode = $(".search_code").val();
        	console.log("searching code:"+searchcode);
        	app.navigate("route/"+searchcode,true);
        }

	});
});
