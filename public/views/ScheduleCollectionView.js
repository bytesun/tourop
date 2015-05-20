define([
	'marionette',
	'templates',
    'underscore',
    'models/Schedule',
    'views/ScheduleItemView'
    
], function (Marionette, templates, _,
		Schedule,
		ScheduleItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: ScheduleItemView,
	  childViewContainer: "#schedule_list_item",
	  template: templates.route_schedule_list,
	  events:{
		  'click .btn_add_schedule': 'addSchedule',
		  'click .btn_del_schedule': 'delSchedule'  
	  },
	  addSchedule: function(e){

		var size = this.collection.length;

		this.collection.push(new Schedule({day:size+1}));
		$("#days").val(this.collection.length);
				
	  },
	  delSchedule: function(e){
			var size = this.collection.length;
			var lastmodel = this.collection.at(size-1);
			
			this.collection.remove(lastmodel);
			$("#days").val((size-1));
					
		  }
	});
});
