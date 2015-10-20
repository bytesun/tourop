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
		template: templates.route_schedule_item,
		model:Model,
		tagName:'div',
        // events: {
        // 	'change .schedule_scenic' :'fetchScenic',
        // },
		regions:{
			scenicsRegion: "#partner_list_scenic_region",
		},
		initialize : function() {
			  this.listenTo(this.model, 'change', this.render);
		},
		onShow: function(){
			var self = this;
 	// 		this.partners = new Bloodhound({
  //                datumTokenizer: function (datum) {
  //                    return Bloodhound.tokenizers.whitespace(datum.value);
  //                },
  //                queryTokenizer: Bloodhound.tokenizers.whitespace,
  //                remote: {
  //                    url: '/api/infos?c=%QUERY&t=ALL',
  //                    wildcard: '%QUERY',
  //                    filter: function (infos) {
  //                        return $.map(infos, function (info) {
  //                            return {
  //                                type : info.type,
  //                                code: info.code,
  //                                name: info.name,
  //                                address: info.address,
  //                                telphone : info.telphone,
  //                                payment : info.payment,
  //                                fax : info.fax,
  //                                contact :info.contact,
  //                                cellphone : info.cellphone,
  //                                email : info.email,
  //                                city : info.city,
  //                                province : info.province,
  //                                country : info.country,
  //                                postcode : info.postcode
                                
  //                            };
  //                        });
  //                    }
  //                }
  //            });
              
  //            // Initialize the Bloodhound suggestion engine
  //            this.partners.initialize();			
			
			//-------------------------------
			var scenics = new Scenics();
			var day = self.model.get('day');
			var loadScenics = this.model.get('scenic');
			if(loadScenics != undefined && loadScenics.length>0){
				scenics.reset(loadScenics);
			}
			
			var scenicCollectionView = new ScenicCollectionView({
				childViewOptions : function () { 
					return { 
						day: day
						}; 
				},
  			  collection:scenics,
	      		templateHelpers:function(){
	    			return {
	    				partnercount:this.collection.length,
	    				day:day

	    			}
	    		}

			});
			scenicCollectionView.on('partner:count:set',function(pc){
         		$("#partner_count_"+day).val(pc);
        	});
			this.scenicsRegion.show(scenicCollectionView);		
			
		},
//         fetchScenic : function(e){
        	
//         	var inputid = e.target.id;
//         	var inputstr = $("#"+inputid).val();
//         	var self = this;
//         	var no = this.model.get('day');
//         	var index = inputid.substring(inputid.lastIndexOf("_")+1);
//         	console.log('get scenic index :'+index);
//               $("#"+inputid).typeahead({
//                     hint: true,
//                     highlight: true,
//                     minLength: 1
//                   }, {
//                   displayKey: 'code',
//                   valueKey: 'name',
//                   source: self.partners,
//               });   
    
//               $("#"+inputid).on('typeahead:selected typeahead:autocompleted', function(event, datum) {
// 		        	var fetchingoitem = app.request("information:entity:fetch",inputstr);
// 		        	$.when(fetchingoitem).done(function(item){
// 		        		if(item!=null){
// 		        			console.log("fetch scenic: "+JSON.stringify(item));
// 		//        			self.model.set({:item.toJSON()});
// 							// self.model.set("scenic",item.toJSON());
// 		     //   			self.trigger("renderCollection");
// 		        			$("#"+inputid).val(item.get("name"));
// 		        			$("#scenic_telphone_"+no+"_"+index).val(item.get("telphone"));
// 		        			$("#scenic_payment_"+no+"_"+index).val(item.get("payment"));
// 		        			$("#scenic_code_"+no+"_"+index).val(item.get("code"));
// 		        			$("#scenic_address_"+no+"_"+index).val(item.get("address"));
// 		        			$("#scenic_contact_"+no+"_"+index).val(item.get("contact"));
// 		        			$("#scenic_fax_"+no+"_"+index).val(item.get("fax"));
// 		        			$("#scenic_city_"+no+"_"+index).val(item.get("city"));
// 		        			$("#scenic_province_"+no+"_"+index).val(item.get("province"));
// 		        			$("#scenic_country_"+no+"_"+index).val(item.get("country"));
// 		        			$("#scenic_postcode_"+no+"_"+index).val(item.get("postcode"));
// 		        		}   	      		
			        	
// 		        	});   
//               });         	
        	
// //        	this.trigger("group:addagency",this.model,inputstr);
   	
//         },


	});
});
