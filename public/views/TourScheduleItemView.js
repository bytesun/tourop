define([
	'marionette',
	'templates',
    'underscore',
    'typeahead',
    'bloodhound',    
    'models/Schedule',
    'models/Partner',
    'collections/Partners',
    'views/PartnerCollectionView'

], function (Marionette, templates, _,
                Typeahead, Bloodhound,
                Model,
		Scenic,
		Scenics,
		ScenicCollectionView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.tour_schedule_item,
		model:Model,
		tagName:'div',
// 		regions:{
// 			scenicListRegion:"#scenic_list_region"
// 		},		
        events: {
        	'mouseenter .typeahead':'fetchPartners',
        },

	initialize : function() {
		    this.partners = {};
		 // this.listenTo(this.model, 'change', this.render);
		 // this.model.on('change', this.render, this);
		  
	},	
   
        onShow: function(e){
            this.partners = new Bloodhound({
                  datumTokenizer: function (datum) {
                      return Bloodhound.tokenizers.whitespace(datum.value);
                  },
                  queryTokenizer: Bloodhound.tokenizers.whitespace,
                  remote: {
                      url: '/api/infos?c=%QUERY&t=ALL',
                      wildcard: '%QUERY',
                      filter: function (infos) {
                          return $.map(infos, function (info) {
                              return {
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
                        if(("_"+inputid).indexOf("breakfast")>0){
            			    self.model.set({"breakfast":datum});
                        }else if(("_"+inputid).indexOf("lunch")>0){
                            self.model.set({"lunch":datum});
                        }else if(("_"+inputid).indexOf("dinner")>0){
                            self.model.set({"dinner":datum});
                        }else if(("_"+inputid).indexOf("hotel")>0){
                            self.model.set({"hotel":datum});                            
                        }            
            			self.trigger("renderCollection");
              });         	
 
        },        

      
	});
});
