define([
  'jquery',
	'marionette',
	'templates',
    'underscore',
        'typeahead',
    'bloodhound'
], function ($,Marionette, templates, _,
        Typeahead, Bloodhound) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.tour,
		regions:{
			tourListRegion:"#tour-list-region"
		},
        events: {
        	"click .btn_route_search":"searchByCode",
        },
    		onShow : function(options) {

            this.routes = new Bloodhound({
                  datumTokenizer: function (datum) {
                      return Bloodhound.tokenizers.whitespace(datum.value);
                  },
                  queryTokenizer: Bloodhound.tokenizers.whitespace,
                  remote: {
                      url: '/api/routes?c=%QUERY',
                      wildcard: '%QUERY',
                      filter: function (routes) {
                          return $.map(routes, function (route) {
                              return {
                                  code: route.code,
                              };
                          });
                      }
                  }
              });
              
              // Initialize the Bloodhound suggestion engine
              this.routes.initialize();
              
              $(".typeahead").typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                  }, {
                  displayKey: 'code',
                  valueKey: 'name',
                  source: this.routes,
              });   
    
              $(".typeahead").on('typeahead:selected typeahead:autocompleted', function(event, datum) {
                   $("#route_code").val(datum.code);
              });               
              // Instantiate the Typeahead UI
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
        _substringMatcher: function(strs) {
          return function findMatches(q, cb) {
            var matches, substringRegex;
        
            // an array that will be populated with substring matches
            matches = [];
        
            // regex used to determine if a string contains the substring `q`
            var substrRegex = new RegExp(q, 'i');
        
            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
              if (substrRegex.test(str)) {
                matches.push(str);
              }
            });
        
            cb(matches);
          };
        }

	});
});
