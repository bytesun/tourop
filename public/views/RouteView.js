define([
	'marionette',
	'templates',
    'underscore',
    'syphon',
     'typeahead',
    'bloodhound',      
    'views/RouteCollectionView'
], function (Marionette, templates, _,
		Syphon,
			Typeahead, Bloodhound,
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
	onShow: function(){
		this.partners = new Bloodhound({
                  datumTokenizer: function (datum) {
                      return Bloodhound.tokenizers.whitespace(datum.value);
                  },
                  queryTokenizer: Bloodhound.tokenizers.whitespace,
                  remote: {
                      url: '/api/routes?c=%QUERY',
                      wildcard: '%QUERY',
                      filter: function (infos) {
                          return $.map(infos, function (info) {
                              return {
                                  code: info.code,
                                };
                          });
                      }
                  }
              });
              
              // Initialize the Bloodhound suggestion engine
              this.partners.initialize();			
			
              
              $("#search_code").typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                  }, {
                  displayKey: 'code',
                  valueKey: 'name',
                  source: this.partners,
              });   
    
              $("#search_code").on('typeahead:selected typeahead:autocompleted', function(event, datum) {
                   $("#search_code").val(datum.code);
              });   
	},       
        searchByCode: function(e){
        	var code = $("#search_code").val();
//        	var fetchingitems = app.request("entities:routes",{c:query});
//        	$.when(fetchingitems).done(function(routes){
//        			        		
//	        	var routeCollectionView = new RouteCollectionView({
//	        		collection:routes
//	        	});
//        		this.routeListRegion.show(routeCollectionView);
//        	});	        	
        	app.navigate('route/'+code,true);
        },
        newRoute: function(e){
        	app.navigate("route_info",true);
        }

	});
});
