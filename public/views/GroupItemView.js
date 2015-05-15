define([
	'marionette',
	'templates',
    'underscore',
    'models/Group',
    'collections/Passengers',
    'models/Passenger',
    'views/PassengerCollectionView',
    'models/Confirmation'
], function (Marionette, templates, _,
		Group,
		Passengers,
		Passenger,
		PassengerCollectionView,
		Confirmation) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.tour_group_item,
		model:Group,
		tagName:'div',
        events: {
        	"keyup .telephone":"formatTel",
        	"change .passenger_agency" :"addAgency",
        	"click .btn_add_passenger" : "addPassenger",
        	"click .btn_confirm_group" : "confirmGroup"
        },
		initialize : function() {
			  this.listenTo(this.model, 'change', this.render);
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
        addPassenger: function(e){
        	e.preventDefault();
        	
        	var gn=this.model.get("no");        	
        	var pn=parseInt($("#pn_"+gn).val());
	    	var passengers = new Array();
			for(var j=1;j<=pn;j++){
				
				passengers[j-1]={
					no:$("#pno_"+gn+"_"+j).val(),
	    			name:$("#pname_"+gn+"_"+j).val(),
	    			gender:$("#gender_"+gn+"_"+j).val(),
	    			age:$("#age_"+gn+"_"+j).val(),
	    			phone:$("#pphone_"+gn+"_"+j).val(),
	    			fee:$("#fee_"+gn+"_"+j).val(),
	    			meal:$("#meal_"+gn+"_"+j).val(),
	    			admissiogn:$("#admission_"+gn+"_"+j).val(),
	    			roomtype:$("#roomtype_"+gn+"_"+j).val(),
				}   	    	
			};
			
			passengers[pn]= {
                no:(pn+1),
    			name:'',
    			gender:'',
    			age:0,
    			phone:'',
    			fee:'',
    			meal:'',
    			admission:'',
    			roomtype:''
        	};
        	this.model.set({passenger:passengers});        	
        	this.render();
        	console.log('changed model is:',this.model);

        },
        addAgency : function(e){
        	e.preventDefault();
        	var inputid = e.target.id;
        	var inputstr = $("#"+inputid).val();
//        	var self = this;
//        	//check admission first
//        	var fetchingoitems = app.request("entities:informations",{c:inputstr,t:'A'});
//        	$.when(fetchingoitems).done(function(items){
//        		if(items.length >= 1){
//        			var agency = items.at(0);
//        			self.model.set({agency:agency.toJSON()});
////        			inputstr = agency.get("name")+" , ("+agency.get("telphone")+") , "+agency.get("address");
////        			console.log("agency : "+inputstr);
////        			$("#"+inputid).val(inputstr);
//        			
//        		}   	      		
//	        	
//        	});    
        	this.trigger("group:addagency",this.model,inputstr);

        },
        confirmGroup: function(e){

        	
        	this.model.set({status:'Confirmed'});
        	this.trigger("group:confirm",this.model);
//        	app.execute("app:tour:save");
        	
        	//generate confirmation and invoice
//        	var routecode=$("#routecode").val();
//        	var self = this;
//        	var fetchingitems = app.request("entities:routes",{c:routecode});
//        	$.when(fetchingitems).done(function(routes){
//        		if(routes.length>0){
//
//        			var route = routes.at(0);
//        			var gn = self.model.get("no");
//        			var cfm = new Confirmation({
//        				no:tourcode+gn,
//        				tourcode:$("#code").val(),
//        				tourname:$("#name").val(),
//        				departuredate:$("#departuredate").val(),
//        				issuedate:new Date()+'',
//                    	bookdate:$("#bookdate"+gn).val(),
//                    	op:$("#op").val(),
//                    	agencyop:'',
//                    	taxablesub:0,
//                    	nontaxablesub:0,
//                    	gst:0,
//                    	total:0,
//                    	remark_c:'',
//                    	remark_i:'',
//                    	issuefrom:{
//                    		name:'',
//                    		address:'',
//                    		city:'',
//                    		province:'',
//                    		country:'',
//                    		postcode:'',
//                    		telephone:'',
//                    		fax:'',
//                    		regno:''
//                    	},
//                    	issueto:{
//                    		name:'',
//                    		address:'',
//                    		city:'',
//                    		province:'',
//                    		country:'',
//                    		postcode:'',
//                    		telephone:'',
//                    		fax:''
//                    	},
//                    	passenger:{
//                    		name:'',
//                    		faretype:'',
//                    		fare:0,
//                    		admission:0,
//                    		meal:0,
//                    		pickup:'',
//                    		dropoff:''
//                    	}
//        			});
//        			
//        		}
//        	});	
    	        	

        	
        }
        

	});
});
