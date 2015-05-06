define([
	'marionette',
	'templates',
    'underscore',
    'models/Bus',
    'views/BusItemView'
    
], function (Marionette, templates, _,
		Bus,
		BusItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: BusItemView,
	  childViewContainer: "#bus_list_item",
	  template: templates.tour_bus_list,

	  events:{
		  'click .btn_add_bus': 'addBus'
	  },
     templateHelpers:function(){
            return {
            	//bus number
                bn: this.collection.length
            }
        },	  
	  addBus: function(e){
		var size = this.collection.length;
		this.collection.push(new Bus({no:size+1}));
		$("#bn").val(this.collection.length);
	  }
	});
});
