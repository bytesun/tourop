define([
	'marionette',
	'templates',
    'underscore',
    'models/Tour'
], function (Marionette, templates, _,
		TourModel) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_item,
		model:TourModel,
		tagName:'tr',
		events:{
			'click .report_passenger_list_guide' : 'showPassengersForGuide',
			'click .report_passenger_list_hotel' : 'showPassengersForHotel'
		},
		showPassengersForGuide: function(e){
			e.preventDefault();
			console.log('list passenger for guide :');
			
			this.trigger('tour:showpassengersforguide',this.model);
		},
		showPassengersForHotel: function(e){
			e.preventDefault();
			console.log('list passenger for hotel');
			this.trigger('tour:showpassengersforhotel',this.model);
			
		}
	});
});
