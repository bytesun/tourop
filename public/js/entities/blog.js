Sunorth.module("Entities", function(Entities, Sunorth,
 Backbone, Marionette, $, _){
	Entities.Blog = Backbone.Model.extend({
	    defaults: {
	    	_id:null,
	        title: '',
	        content:'',
	        tag:'',
	        time:new Date()
	      },	
	      urlRoot: 'blogs',
	      idAttribute: '_id'
	      
	});
	
	
	Entities.BlogCollection = Backbone.Collection.extend({
		url:'blogs',
		model:Entities.Blog,
		comparator: function(blog){
			var date = new Date(blog.get('time'));
	        return -date.getTime();
		}
	});	
	
	
	var API = {
		getBlogs:function(){
			var blogs = new Entities.BlogCollection();
			var defer = $.Deferred();
			blogs.fetch({
				success:function(data){
					defer.resolve(data);
				}
			});	
			var promise = defer.promise();
			$.when(promise).done(function(blogs){
				if(blogs.length === 0){
					
				}
			});
			return promise;
		},
		getBlog:function(id){
			var blog = new Entities.Blog({'_id':id});
			var defer = $.Deferred();
			//setTimeout(function(){
				blog.fetch({
					success:function(data){
						defer.resolve(data);
					},
					error:function(data){
						defer.resolve(undefined);
					}
				
				});
			//},2000);		
			//ocase.fetch().done(function(){
	//		});
			return defer.promise();
		}
	};
	
	Sunorth.reqres.setHandler("entities:blogs", function(){
		 return API.getBlogs();
	 });
	
	Sunorth.reqres.setHandler("entity:blog",function(id){
		return API.getBlog(id);
	});
});