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
		  'click .btn_add_group': 'addGroup',
		  'click .btn_del_group': 'delGroup'
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
	  },
	  delGroup: function(e){
			var size = this.collection.length;
			this.collection.pop();
			$("#gn").val(this.collection.length-1);
		  }
        
	});
});
