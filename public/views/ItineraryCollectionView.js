define([
	'marionette',
	'templates',
    'underscore',
    'models/Itinerary',
    'views/ItineraryItemView'
    
], function (Marionette, templates, _,
		Itinerary,
		ItineraryItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: ItineraryItemView,
	  childViewContainer: "#itinerary_list_item",
	  template: templates.route_itinerary_list,
	  events:{
		  'click .btn_add_itinerary_memo': 'addItinerary'
	  },
	  addItinerary: function(e){

		var size = this.collection.length;

		this.collection.push(new Itinerary({day:size+1}));
		$("#days").val(this.collection.length);
				
	  }
	});
});
