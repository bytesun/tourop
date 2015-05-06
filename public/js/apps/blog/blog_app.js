Sunorth.module("BlogApp", function(BlogApp, Sunorth,Backbone, Marionette, $, _){
	BlogApp.Router = Marionette.AppRouter.extend({
		appRoutes:{
			//"cases":"listCases",
			"blogs(/filter/criterion::criterion)":"listBlogs",
			"blogs/:id":"showBlog"
		}
	});
	var API = {
			listBlogs:function(criterion){
				BlogApp.List.Controller.listBlogs(criterion);
			},	
			showBlog:function(id){
				BlogApp.Show.Controller.showBlog(id);
			}
	};
	
	Sunorth.on('blogs:list',function(){
		API.listBlogs();
	});
	
	Sunorth.on('blog:show',function(id){
		API.showBlog(id);
	});
	
	Sunorth.addInitializer(function(){
		new BlogApp.Router({
			controller:API
		});
	});
});