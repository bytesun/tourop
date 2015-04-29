define([
	'marionette',
	'templates',
    'underscore',
    'models/information',
    'collections/informations'
], function (Marionette, templates, _,infoModel,Informations) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.info,
		
        events: {
        	'change .search_code' : "searchInfoByCode",
        	'click .btn_info_add': 'newInfo',
        	'click .btn_info_search': 'searchInfo',
        	'click .a_info_edit': 'editInfo',
        	'click .a_info_delete': 'delInfo'
        },
        searchInfoByCode: function(e){
        	var searchCode = $("search_code").val();
        	var infos = new Informations();
        	infos.fetch({
				success:function(data){
					
				}
			});	
        },
        newInfo: function(e){  
        	app.navigate("info_new",true);
        },
        searchInfo : function(e){
//        	app.navigate("info_search",true);

        },
        editInfo : function(e){
//        	app.navigate("info_edit",true);
        	 
        },
        delInfo:function(){
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure deleting this information?'
        	});        	
        }

	});
});
