define([
	'marionette',
	'templates',
    'underscore',
    'models/Group',
    'views/GroupItemView'

    
], function (Marionette, templates, _,
		Group,
		GroupItemView
		) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: GroupItemView,
	  childViewContainer: "#group_list_item",
	  template: templates.tour_group_list,
	  events:{
		  'click .btn_add_group': 'addGroup'
	  },

     templateHelpers:function(){
            return {
            	//passenger number
                gn: this.collection.length
            }
        },	  
	  addGroup: function(e){
		var size = this.collection.length;
		this.collection.push(new Group({no:size+1}));
		$("#gn").val(this.collection.length);
	  }
	});
});
