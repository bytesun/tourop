Sunorth.module("BlogApp.List", function(List, Sunorth,Backbone, Marionette, $, _){
	List.Controller = {
			listBlogs:function(criterion){
				var fetchingblogs = Sunorth.request("entities:blogs");
			
				$.when(fetchingblogs).done(function(blogs){
					var blogCollectionView = new Sunorth.BlogApp.List.BlogCollectionView({
						collection:blogs
					});
					Sunorth.mainRegion.show(blogCollectionView);
				});
			}
	}
});