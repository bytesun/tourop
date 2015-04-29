define([
	'marionette',
	'templates',
    'underscore',
    'collections/informations',
    'views/InfoCollectionView'
], function (Marionette, templates, _,
		Informations,
		InfoCollectionView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.info,
		regions:{
			InfoListRegion:"#info-list-region"
		},
	 events: {
     	'change .search_code' : "searchInfoByCode",
     	'click .btn_info_add': 'newInfo',
     	'click .btn_info_search': 'searchInfo'
     },
     searchInfoByCode: function(e){
     	var searchCode = $("search_code").val();
     	var infos = new Informations();
     	infos.fetch({
				success:function(data){
					console.log('infos '+JSON.stringify(data));
				}
			});	
     },
     newInfo: function(e){  
     	app.navigate("info_new",true);
     },
     searchInfo : function(e){
//     	app.navigate("info_search",true);

     }
	

	});
});
