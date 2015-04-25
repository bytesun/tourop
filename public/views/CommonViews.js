MySpace.module("Common.Views",function(Views,MySpace,Backbone,Marionette,$,_){
	Views.Loading = Marionette.ItemView.extend({
		template:"#loading-view",
		initialize:function(options){
			var options = options || {};
			this.title = options.title || "Loading";
			this.message = options.message || "Please wait, data is loading.";
		},
		serializeData:function(){
			return {
				title : this.title,
				message : this.message
			}
		},
		onShow:function(){
			var opts = {
					lines:13,
					length:20,
					width:10,
					radius:30,
					corners:1,
					rotate:0,
					direction:1,
					color:"#000",
					speed:1,
					trail:60,
					shadow:false,
					hwaccel:false,
					className:"spinner",
					zIndex:2e9,
					top:"30px",
					left:"auto"
			};

			$("#spinner").spin(opts);
		}
	});
	
	Views.Form = Marionette.ItemView.extend({
		
//		events:{
//			"click button.js-submit":"submitClicked",
//			"click button.js-close" : "closeClicked"	
//		},
//		
//		closeClicked: function(e){
//			this.trigger("form:close");
//		},
//		submitClicked:function(e){
//			e.preventDefault();
//			var data = Backbone.Syphon.serialize(this);
//			this.trigger("form:submit", data);
//		},
		onFormDataInvalid : function(errors){
			var self = this;
			
			var markErrors = function(value, key){
				console.log('notice error when it is invalid:'+value);
				var $controlGroup =  self.$el.find("#case-"+key).parent();
				var $errorEl = $("<div>",{class:"alert alert-warning",text:key+' '+value});
				$controlGroup.append($errorEl).addClass("error");
				
			}
			_.each(errors,markErrors);
		}
	});
	
});