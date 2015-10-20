define([
	'marionette',
	'templates',
    'underscore',
    'models/Partner',
    'views/PartnerItemView'
    
], function (Marionette, templates, _,
		Partner,
		PartnerItemView) {
	'use strict';

	return Marionette.CompositeView.extend({	
	  childView: PartnerItemView,
	  childViewContainer: "#partner_list_scenic_item",
	  template: templates.partner_list_scenic,
	 
      events: {
      	'click .btn_add_scenic' :'addScenic',
    	'click .btn_del_scenic' :'delScenic',
      },
      addScenic: function(e){
      	e.preventDefault();
      	var size = this.collection.length;
      	this.collection.push(new Partner({no:size+1}));
      	console.log('push : scenic collection '+JSON.stringify(this.collection));
      	this.trigger("partner:count:set",this.collection.length)
      },
      delScenic: function(e){
      	e.preventDefault();
      	this.collection.pop();
      	console.log('pop : scenic collection '+JSON.stringify(this.collection));
      	this.trigger("partner:count:set",this.collection.length)
      },
	  onChildviewRenderCollection: function() {
	  	console.log('re-render admission collection :'+JSON.stringify(this.collection));
			this.render();
	  },     
	});
});
