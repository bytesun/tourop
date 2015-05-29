define([
	'marionette',
	'templates',
    'underscore',
    'models/Route',
    'models/Tour',
    'views/TourInfoView'
], function (Marionette, templates, _,RouteModel,
		TourModel,
		TourInfoView) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.route_item,
		model:RouteModel,
		tagName:'tr',
		events:{
			'click .start_tour': 'startTour',
			'click .a_route_delete': 'delRoute'
				
		},
		startTour: function(e){
			app.navigate("/tour_new/"+this.model.get("_id"),true);
		},
		delRoute: function(e){
			e.preventDefault();
			var self =this;
			app.execute('app:dialog:confirm',{title:'Confirm!',message:'You will delete <b>\"'+self.model.get('name')+"\"</b>! Please confirm it first.",
        		confirmNo: function(){
        			console.log('cancel deleting operation');
        		},
        		confirmYes:function(){
        			console.log('delete a route : '+JSON.stringify(self.model));
        			self.model.destroy();		
        		}});
        	
		}
	});
});
