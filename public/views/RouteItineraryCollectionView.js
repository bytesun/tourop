define([
	'marionette',
	'templates',
    'underscore',
    'views/RouteItineraryItemView'
    
], function (Marionette, templates, _,RouteItineraryItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: RouteItineraryItemView,
	  childViewContainer: "#itinerary_list_item",
	  template: templates.route_itinerary_list,
	  events:{
		  'click .btn_add_itinerary_memo': 'addItinerary'
	  },
	  addItinerary: function(e){

		var size = this.collection.length;
		console.log('before collection size :'+size);
		this.collection.push({
			day:size+1,
			from:'',
			via:'',
			to:'',
			itinerary:[]
		});
		$("#days").val(this.collection.length);
				
	  }
	});
});
