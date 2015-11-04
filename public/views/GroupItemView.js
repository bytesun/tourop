define([
	'marionette',
	'templates',
    'underscore',
    'models/Group',
    'collections/Tourists',
    'models/Tourist',
    'views/TourTouristCollectionView',
    'models/Confirmation',
        'typeahead',
    'bloodhound'
], function (Marionette, templates, _,
		Group,
		Tourists,
		Tourist,
		TourTouristCollectionView,
		Confirmation,
		Typeahead, Bloodhound) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.tour_group_item,
		model:Group,
		tagName:'div',
        events: {
        	"click .btn_confirm_group" : "confirmGroup",
        	"click .btn_revise_group" : "reviseGroup",
            'mouseenter .typeahead': 'addAgency',

        },
        regions:{
			touristRegion: "#tourist_list_region",
		},
		initialize : function(options) {
		    this.partners = {};
			this.model.set({route: options.route,
				tourstatus:options.tourstatus});
			this.listenTo(this.model, 'change', this.render);
		},
		onDomRefresh:function(){
			this._showTourists();
		},
        onShow: function(e){
            this.partners = new Bloodhound({
                  datumTokenizer: function (datum) {
                      return Bloodhound.tokenizers.whitespace(datum.value);
                  },
                  queryTokenizer: Bloodhound.tokenizers.whitespace,
                  remote: {
                      url: '/api/partners?c=%QUERY&t=A',
                      wildcard: '%QUERY',
                      filter: function (infos) {
                          return $.map(infos, function (info) {
                              return {
                                  _id:info._id,
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
              // Instantiate the Typeahead UI
         
        	this._showTourists();
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
     
        addAgency : function(e){
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
        			self.model.set({agency:datum});
        			self.trigger("renderCollection");
          });              
        // 	var no = this.model.get('no');
  

        // 	var fetchingoitem = app.request("information:entity:fetch",inputstr);
        // 	$.when(fetchingoitem).done(function(item){
        // 		if(item!=null){
        // 			self.model.set({agency:item.toJSON()});
        // 			self.trigger("renderCollection");

        // 		}   	      		
	        	
        // 	}); 

        },
        reviseGroup : function(e){
        	this.model.set({status:'Revised'});
        	this.trigger("group:revise",this.model);      
        },
        confirmGroup: function(e){

			var self =this;
			app.execute('app:dialog:confirm',{title:'Confirm!',message:'Please make sure all information have been input before you confirm this group!',
        		confirmNo: function(){
        			console.log('cancel deleting operation');
        		},
        		confirmYes:function(){
                	//reset lastest passenger info
                   	var gn=self.model.get("no");        	
                	var pn=parseInt($("#tn_"+gn).val());
        	    	var passengers = new Array();
        			for(var j=1;j<=pn;j++){				
        				passengers[j-1]={
        					no:$("#pno_"+gn+"_"+j).val(),
        	    			name:$("#pname_"+gn+"_"+j).val(),
        	    			gender:$("#gender_"+gn+"_"+j).val(),
        	    			age:$("#age_"+gn+"_"+j).val(),
        	    			phone:$("#pphone_"+gn+"_"+j).val(),
        	    			fare:$("#fare_"+gn+"_"+j).val(),
        	    			meal:$("#meal_"+gn+"_"+j).val(),
        	    			admission:$("#admission_"+gn+"_"+j).val(),
        	    			roomtype:$("#roomtype_"+gn+"_"+j).val(),
        	    			fcommission:$("#fcommission_"+gn+"_"+j).val(),
        	    			mcommission:$("#mcommission_"+gn+"_"+j).val()
        				}   	    	
        			};
        			
                	
        			self.model.set({
            			bookdate:$("#bookdate"+gn).val(),
            			pickup:$("#pickup"+gn).val(),
            			dropoff:$("#dropoff"+gn).val(),
//            			commission:$("#commission"+gn).val(),
//            			adjustamount:$("#adjustamount"+gn).val(),
                		tourist:passengers});
        			self.trigger("group:confirm",self.model);         			
        		}});        	
       
        	
        },
        
       
        _showTourists:function(){
        	var self = this;
        	var tourists = this.model.get('tourist');
        	console.log('fetch tourists from group :'+JSON.stringify(tourists));
        	var touristCollection = new Tourists();
        	if(tourists != undefined && tourists.length>0)
        		touristCollection.reset(tourists);
        	var groupno=this.model.get('no');
        	var touristsView = new TourTouristCollectionView({
        		childViewOptions : function () { return { groupno: groupno,
        			route:self.model.get('route')}; },
        		collection:touristCollection,
        		templateHelpers:function(){
        			return {
        				tn:this.collection.length,
        				groupno:groupno,
        				groupstatus:self.model.get('status')
        			}
        		}
        	});
        	touristsView.on('tourists:tn:set',function(tn){
         		$("#tn_"+groupno).val(tn);
        	});
        	this.touristRegion.show(touristsView);
        },
        
        
        
	});
});
