define([
	'marionette',
	'templates',
    'underscore',
     'typeahead',
    'bloodhound',      
    'models/Information',
    'collections/Informations',
    'views/InfoCollectionView',
    'views/InfoAuthorView'
], function (Marionette, templates, _,
		Typeahead, Bloodhound,
		Information,
		Informations,
		InfoCollectionView,
		InfoAuthorView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.info,
		regions:{
			InfoListRegion:"#info-list-region"
		},
	 events: {
		'click .btn_info_search': 'searchInfo',
     	'click .btn_info_add': 'newInfo'
     },
       

	onShow: function(){
		this.partners = new Bloodhound({
                  datumTokenizer: function (datum) {
                      return Bloodhound.tokenizers.whitespace(datum.value);
                  },
                  queryTokenizer: Bloodhound.tokenizers.whitespace,
                  remote: {
                      url: '/api/infos?c=%QUERY&t=ALL',
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
     newInfo: function(e){  
     	
     	var infoView = new InfoAuthorView({
                    model: new Information(),
                })
     	app.dialog.show(infoView);
     	// app.navigate("info_new",true);
     },
     searchInfo : function(e){
    	var c =  $("#search_code").val();
    	if(c == "")c = 0;
    	app.navigate("info/"+c+"/"+$("#partner_types").val(),true); 	

     }
	

	});
});
