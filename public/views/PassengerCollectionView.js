define([
	'marionette',
	'templates',
    'underscore',
    'models/Passenger',
    'views/PassengerItemView'
    
], function (Marionette, templates, _,
		Group,
		PassengerItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: PassengerItemView,
	  childViewContainer: "#passenger_list_item",
	  template: templates.tour_passenger_list,

	  events:{
		  'click .btn_add_passenger': 'addPassenger'
	  },
	  onShow:function(){
		  console.log('onshow passenger collection view...');
	  },
     templateHelpers:function(){
            return {
            	//passenger number
                pn: this.collection.length
            }
        },	  
	  addPassenger: function(e){
		var size = this.collection.length;
		this.collection.push(new Passenger({no:size+1}));
		$("#pn").val(this.collection.length);
	  }
	});
});
