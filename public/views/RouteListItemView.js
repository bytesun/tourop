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
			'click .start_tour': 'startTour'
		},
		startTour: function(e){
//			console.log('start a tour with '+JSON.stringify(this.model));
//			var tourModel = new TourModel();
//			tourModel.set({
//				routecode:this.model.get('code'),
//				name:this.model.get('name'),
//				days:this.model.get("days"),
//				itinerary:this.model.get('itinerary'),
//				note:this.model.get('note')
//				
//			});
//			console.log('start a tour with '+JSON.stringify(tourModel));
//			app.main.show(new TourInfoView({
//        		model: tourModel
//        	}));
			app.navigate("/tour_new/"+this.model.get("_id"),true);
		}
	});
});
