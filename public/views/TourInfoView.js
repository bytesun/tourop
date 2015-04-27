define([
	'marionette',
	'templates',
    'underscore',
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_info,

        events: {
            
            'click .passenger_edit' : 'editPassenger',
            'click .passenger_delete' : 'deletePassenger',
            'click .passenger_add': 'addPassenger',
            'click .bus_add' : 'addBus',
            'click .btn_tour_save' : 'saveTour',
            'click .btn_tour_confirm' : 'confirmTour',
            'click .btn_tour_close' : 'closeTour'  
        },
        addPassenger : function(e){

        	app.execute("app:dialog:simple",{
        		title:'Add Passenger',
        		message : ''
        	},templates.editPassenger);
        },
        
        editPassenger : function(e){

        	app.execute("app:dialog:simple",{
        		title:'Edit Passenger',
        		message : ''
        	},templates.editPassenger);
        },
        deletePassenger : function(e){

        	console.log('click a link to edit passenger');
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure deleting this passenger information?'
        	},templates.editPassenger);
        },        
        addBus : function(e){

        	app.execute("app:dialog:simple",{
        		title:'Add Bus',
        		message : ''
        	},templates.editPassenger);
        },
        
        saveTour: function(e){
        	app.execute("app:notify",{
        		title:'',
        		description : 'All information has been saved!'
        	});
//        	console.log('start tour');
//            app.execute("app:dialog:simple", {
//                title: 'Start a new tour', // Optional
//                message: 'Input new tour information'
//            },
//            templates.newTour);
        },
        confirmTour: function(e){
        	app.execute("app:dialog:confirm",{
        		title:'',
        		message : 'Are you sure all information are correct?'
        	});
        },        
        closeTour: function(e){
        	console.log('close tour');
            app.execute("app:dialog:simple", {
                title: 'Input memo information to close this tour', // Optional
                message: 'Input close information'
            },
            templates.tour_memo);
        }

	});
});
