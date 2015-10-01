define([
	'marionette',
	'templates',
    'underscore',
    'models/Schedule',
    'models/Partner',
    'collections/Partners',
    'views/PartnerCollectionView'
], function (Marionette, templates, _,Model,
		Scenic,
		Scenics,
		ScenicCollectionView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.route_schedule_item,
		model:Model,
		tagName:'div',
        events: {
        	'change .schedule_scenic' :'fetchScenic',
        	'change .schedule_breakfast':'addBreakfast',
        	'change .schedule_lunch':'addLunch',
        	'change .schedule_dinner':'addDinner',
        	'change .schedule_hotel':'addHotel'
        },
		regions:{
			scenicsRegion: "#partner_list_scenic_region",
		},
		initialize : function() {
			  this.listenTo(this.model, 'change', this.render);
		},
		onShow: function(){
			var self = this;
			var scenics = new Scenics();
			var day = self.model.get('day');
			var loadScenics = this.model.get('scenic');
			if(loadScenics != undefined && loadScenics.length>0){
				scenics.reset(loadScenics);
			}
			console.log('scenics :'+JSON.stringify(scenics));
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
        fetchScenic : function(e){
        	
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	var self = this;
        	var no = this.model.get('day');
        	var index = inputid.substring(inputid.lastIndexOf("_")+1);
        	console.log('get scenic index :'+index);
//        	this.trigger("group:addagency",this.model,inputstr);
        	var fetchingoitem = app.request("information:entity:fetch",inputstr);
        	$.when(fetchingoitem).done(function(item){
        		if(item!=null){
        			console.log("fetch scenic: "+JSON.stringify(item));
//        			self.model.set({:item.toJSON()});
					// self.model.set("scenic",item.toJSON());
     //   			self.trigger("renderCollection");
        			$("#"+inputid).val(item.get("name"));
        			$("#scenic_telphone_"+no+"_"+index).val(item.get("telphone"));
        			$("#scenic_payment_"+no+"_"+index).val(item.get("payment"));
        			$("#scenic_code_"+no+"_"+index).val(item.get("code"));
        			$("#scenic_address_"+no+"_"+index).val(item.get("address"));
        			$("#scenic_contact_"+no+"_"+index).val(item.get("contact"));
        			$("#scenic_fax_"+no+"_"+index).val(item.get("fax"));
        			$("#scenic_city_"+no+"_"+index).val(item.get("city"));
        			$("#scenic_province_"+no+"_"+index).val(item.get("province"));
        			$("#scenic_country_"+no+"_"+index).val(item.get("country"));
        			$("#scenic_postcode_"+no+"_"+index).val(item.get("postcode"));
        		}   	      		
	        	
        	});      	
        },

        addBreakfast: function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	var self = this;
        	var no = this.model.get('day');
  
//        	this.trigger("group:addagency",this.model,inputstr);
        	var fetchingoitem = app.request("information:entity:fetch",inputstr);
        	$.when(fetchingoitem).done(function(item){
        		if(item!=null){
//        			self.model.set({agency:item.toJSON()});
					self.model.set("breakfast",item.toJSON());
        			self.trigger("renderCollection");
        			// $("#"+inputid).val(item.get("name"));
        			// $("#breakfast_telphone_"+no).val(item.get("telphone"));
        			// $("#breakfast_payment_"+no).val(item.get("payment"));
        			// $("#breakfast_code_"+no).val(item.get("code"));
        			// $("#breakfast_address_"+no).val(item.get("address"));
        			// $("#breakfast_contact_"+no).val(item.get("contact"));
        			// $("#breakfast_fax_"+no).val(item.get("fax"));
        			// $("#breakfast_city_"+no).val(item.get("city"));
        			// $("#breakfast_province_"+no).val(item.get("province"));
        			// $("#breakfast_country_"+no).val(item.get("country"));
        			// $("#breakfast_postcode_"+no).val(item.get("postcode"));
        		}   	      		
	        	
        	});   
        },
        addLunch: function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	var self = this;
        	var no = this.model.get('day');
  
//        	this.trigger("group:addagency",this.model,inputstr);
        	var fetchingoitem = app.request("information:entity:fetch",inputstr);
        	$.when(fetchingoitem).done(function(item){
        		if(item!=null){
					self.model.set("lunch",item.toJSON());
        			self.trigger("renderCollection");
//        			self.model.set({agency:item.toJSON()});
        			// $("#"+inputid).val(item.get("name"));
        			// $("#lunch_telphone_"+no).val(item.get("telphone"));
        			// $("#lunch_payment_"+no).val(item.get("payment"));
        			// $("#lunch_code_"+no).val(item.get("code"));
        			// $("#lunch_address_"+no).val(item.get("address"));
        			// $("#lunch_contact_"+no).val(item.get("contact"));
        			// $("#lunch_fax_"+no).val(item.get("fax"));
        			// $("#lunch_city_"+no).val(item.get("city"));
        			// $("#lunch_province_"+no).val(item.get("province"));
        			// $("#lunch_country_"+no).val(item.get("country"));
        			// $("#lunch_postcode_"+no).val(item.get("postcode"));
        		}   	      		
	        	
        	});
        },
        addDinner: function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	var self = this;
        	var no = this.model.get('day');
  
//        	this.trigger("group:addagency",this.model,inputstr);
        	var fetchingoitem = app.request("information:entity:fetch",inputstr);
        	$.when(fetchingoitem).done(function(item){
        		if(item!=null){
        			self.model.set("dinner",item.toJSON());
        			self.trigger("renderCollection");
//        			self.model.set({agency:item.toJSON()});
        			// $("#"+inputid).val(item.get("name"));
        			// $("#dinner_telphone_"+no).val(item.get("telphone"));
        			// $("#dinner_payment_"+no).val(item.get("payment"));
        			// $("#dinner_code_"+no).val(item.get("code"));
        			// $("#dinner_address_"+no).val(item.get("address"));
        			// $("#dinner_contact_"+no).val(item.get("contact"));
        			// $("#dinner_fax_"+no).val(item.get("fax"));
        			// $("#dinner_city_"+no).val(item.get("city"));
        			// $("#dinner_province_"+no).val(item.get("province"));
        			// $("#dinner_country_"+no).val(item.get("country"));
        			// $("#dinner_postcode_"+no).val(item.get("postcode"));
        		}   	      		
	        	
        	});
        },
        addHotel: function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
        	var self = this;
        	var no = this.model.get('day');
  
//        	this.trigger("group:addagency",this.model,inputstr);
        	var fetchingoitem = app.request("information:entity:fetch",inputstr);
        	$.when(fetchingoitem).done(function(item){
        		if(item!=null){
        			// console.log('fetching hotel: '+JSON.stringify(item));
					self.model.set("hotel",item.toJSON());
        			self.trigger("renderCollection");        			
//        			self.model.set({agency:item.toJSON()});
        			// $("#"+inputid).val(item.get("name"));
        			// $("#hotel_telphone_"+no).val(item.get("telphone"));
        			// $("#hotel_payment_"+no).val(item.get("payment"));
        			// $("#hotel_code_"+no).val(item.get("code"));
        			// $("#hotel_address_"+no).val(item.get("address"));
        			// $("#hotel_contact_"+no).val(item.get("contact"));
        			// $("#hotel_fax_"+no).val(item.get("fax"));
        			// $("#hotel_city_"+no).val(item.get("city"));
        			// $("#hotel_province_"+no).val(item.get("province"));
        			// $("#hotel_country_"+no).val(item.get("country"));
        			// $("#hotel_postcode_"+no).val(item.get("postcode"));
        		}   	      		
	        	
        	});
        },

    

	});
});
