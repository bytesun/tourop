define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.confirmation,
		regions:{
			confirmationListRegion:"#confirmation-list-region"
		},
        events: {
//            'click #notify' : 'notify',
//            'click #modal' : 'showSampleModal',
//            'click #confirm' : 'showSampleConfirm'
        	"change .search_code" : "searchByCode",
        	"click .btn_confirmation_search":"searchByCode",
        },
        searchByCode: function(e){
        	var query = $("#tourcode").val();
        	app.navigate('confirmation/'+query,true);
        },

	});
});
