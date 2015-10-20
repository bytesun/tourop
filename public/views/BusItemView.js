define([
	'marionette',
	'templates',
    'underscore',
    'models/Bus'
], function (Marionette, templates, _,Model) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_bus_item,
		model:Model,
		tagName:'div',
		initialize : function() {
			  this.listenTo(this.model, 'change', this.render);
		},        
     
		  events: {
			  "keyup .telephone":"formatTel",
	          'mouseenter .typeahead' :'addBuscom'
	        	
	        },
		onShow: function(){
			this.partners = new Bloodhound({
	                  datumTokenizer: function (datum) {
	                      return Bloodhound.tokenizers.whitespace(datum.value);
	                  },
	                  queryTokenizer: Bloodhound.tokenizers.whitespace,
	                  remote: {
	                      url: '/api/infos?c=%QUERY&t=B',
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
	        formatTel: function(e){
	        	e.preventDefault();
	        	
	        	var input = $(e.target).val();
	        	var length = input.length>14?14:input.length;
	        	var c = '';
	        	var out = '';
	        	for(var i=0;i<length;i++){
	        		c = input.substring(i,i+1);
	        		if(i==0 && c != '('){
	        			out = '(';
	        		}else if(i == 4 && c != ')'){
	        			out = out+') ';
	        		}else if(i == 9 && c != '-'){
	        			out = out+'-';
	        		}
	        		out = out+c;
	        	}
	        	
	        	$(e.target).val(out);
	        },
	        addBuscom : function(e){
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
	                   //$(".typeahead").val(datum.code);
	                   self.model.set({buscom:datum});
	                   console.log('current model of bus :'+JSON.stringify(self.model));
	                   self.trigger("renderCollection");
	              });  	        	
	        	
	        	//check admission first
//	        	var fetchingoitems = app.request("entities:informations",{c:inputstr,t:'B'});
//	        	$.when(fetchingoitems).done(function(items){
//	        		if(items.length >= 1){
//	        			var buscom = items.at(0);
//	        			inputstr = buscom.get("name")+"  ("+buscom.get("telphone")+")  "+buscom.get("address");
//	        			$("#"+inputid).val(inputstr);
//	        			this.model.set({buscom:buscom});
//	        		}   	
//	        		
//		        	
//	        	});       	
	        	// this.trigger("bus:addbuscom",this.model,inputstr);
	        }        
       
	});
});
