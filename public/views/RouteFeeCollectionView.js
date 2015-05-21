define([
	'marionette',
	'templates',
    'underscore',
    'models/FareType',
    'views/RouteFeeItemView'
    
], function (Marionette, templates, _,
		FareType,
		RouteFeeItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: RouteFeeItemView,
	  childViewContainer: "#fare_type_item",
	  template: templates.route_faretype_list,
	  events:{
		  'click .btn_add_fare': 'addFare',
		  'click .btn_del_fare': 'delFare',
		  'click .btn_add_meal': 'addMeal',
		  'click .btn_del_meal': 'delMeal',
		  'click .btn_add_admission': 'addAdmission',
		  'click .btn_del_admission': 'delAdmission'
	  },
	  addFare: function(e){
			var size = this.collection.length;

			this.collection.push(new FareType({no:size+1}));

			$("#fn").val(this.collection.length);
	  },
	  addMeal: function(e){
			var size = this.collection.length;

			this.collection.push(new FareType({no:size+1}));
			$("#mn").val(this.collection.length);
	  },	
	  addAdmission: function(e){
			var size = this.collection.length;

			this.collection.push(new FareType({no:size+1}));
			$("#an").val(this.collection.length);
	  },
	  delFare: function(e){
		  this.collection.pop();
		  $("#fn").val(this.collection.length);
	  },
	  delMeal: function(e){
		  this.collection.pop();
		  $("#mn").val(this.collection.length);
	  },
	  delAdmission: function(e){
		  this.collection.pop();
		  $("#an").val(this.collection.length);
	  }
	});
});
