define([
	'marionette',
	'templates',
    'underscore',
     'typeahead',
    'bloodhound',     
    'models/Partner'
], function (Marionette, templates, _,
	Typeahead, Bloodhound,
	Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.partner_item_scenic,
		model:Model,
		tagName:'div',
        events: {
        	'mouseenter .typeahead':'fetchPartners'
        },		
		initialize : function(options) {
			this.model.set({day: options.day});
			this.listenTo(this.model, 'change', this.render);
		},
		onShow: function(){
			var self = this;
 			this.partners = new Bloodhound({
                  datumTokenizer: function (datum) {
                      return Bloodhound.tokenizers.whitespace(datum.value);
                  },
                  queryTokenizer: Bloodhound.tokenizers.whitespace,
                  remote: {
                      url: '/api/partners?c=%QUERY&t=S',
                      wildcard: '%QUERY',
                      filter: function (infos) {
                          return $.map(infos, function (info) {
                              return {
                                  _id : info._id,
                                  type : info.type,
                                  code: info.code,
                                  name: info.name,
                                  address: info.address,
                                  telphone : info.telphone,
                                  payment : info.payment,
                                  fax : info.fax,
                                  contact :info.contact,
                                  cellphone : info.cellphone,
                                  email : info.email,
                                  city : info.city,
                                  province : info.province,
                                  country : info.country,
                                  postcode : info.postcode
                                
                              };
                          });
                      }
                  }
              });
              
              // Initialize the Bloodhound suggestion engine
              this.partners.initialize();
		},
       fetchPartners: function(e){
        	e.preventDefault();
        	delete this.events[e];
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	var self = this;
        	
              $("#"+inputid).typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                  }, {
                  displayKey: 'code',
                  valueKey: 'name',
                  source: self.partners,
              });   
    
              $("#"+inputid).on('typeahead:selected typeahead:autocompleted', function(event, datum) {
              			
           			    self.model.set(datum);
           			    console.log('current model is :'+JSON.stringify(self.model));
            			self.trigger("renderCollection");
              });         	
 
        },        
		

	});
});
