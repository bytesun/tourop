define([
	'marionette',
	'templates',
    'underscore',
    'views/CommonView'
], function (Marionette, templates, _, CommonView) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.agency_list,

        events: {
            'click .btn_agency_search' : 'searchAgency',
            'click .btn_agency_add' : 'addAgency',
            'click .a_agency_edit' : 'editAgency',
            'click btn_agency_save' : 'saveAgency',
            'click .a_agency_delete' : 'delAgency',
//            'click #confirm' : 'showSampleConfirm'
        },
        searchAgency: function(){
        	
        },
        addAgency: function(){
        	app.main.show(new CommonView({template:templates.agency_info}))
        },
        saveAgency: function(){
        	app.execute("app:notify",{
        		title:'',
        		description : 'All information has been saved!'
        	});

        },        
        delAgency:function(){
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure deleting this agency information?'
        	});        	
        }

	});
});
