define([
	'marionette',
	'templates',
    'underscore',
    'models/Tourist',
    'views/TourTouristItemView'
    
], function (Marionette, templates, _,
		Tourist,
		TourTouristItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: TourTouristItemView,
	  childViewContainer: "#tourist_item",
	  template: templates.tour_tourist_list,
	 
      events: {
      	"click .btn_add_tourist" : "addTourist",
      	"click .btn_del_tourist" : "delTourist",
      },
      addTourist: function(e){
      	e.preventDefault();

      	var size = this.collection.length;
      	this.collection.push(new Tourist({no:size+1}));
      	this.trigger("tourists:tn:set",this.collection.length)
      },
      delTourist: function(e){
      	e.preventDefault();
      	this.collection.pop();
      	this.trigger("tourists:tn:set",this.collection.length)
      },
    
	});
});
