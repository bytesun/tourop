define([
	'marionette',
	'templates',
    'underscore',
    'models/Information',
    'collections/Informations',
    'views/InfoCollectionView',
    'views/InfoAuthorView'
], function (Marionette, templates, _,
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
//		 'change #partner_types': 'listByType',
//     	'change .search_code' : "searchInfoByCode",
		'click .btn_info_search': 'searchInfo',
     	'click .btn_info_add': 'newInfo'
     },
     listByType: function(e){
//     	console.log('change partner type :'+$("#partner_types").val());
//     	console.log($(".search_code").val());
//     	console.log($("#partner_types").val());
//     	app.navigate("info/"+$(".search_code").val()+"/"+$("#partner_types").val(),true);
     	
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
     	
     	var infoView = new InfoAuthorView({
                    model: new Information(),
                })
     	app.dialog.show(infoView);
     	// app.navigate("info_new",true);
     },
     searchInfo : function(e){
    	var c =  $(".search_code").val();
    	if(c == "")c = 0;
    	app.navigate("info/"+c+"/"+$("#partner_types").val(),true);
//     	

     }
	

	});
});
