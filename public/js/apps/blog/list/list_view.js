Sunorth.module("BlogApp.List", function(List, Sunorth,Backbone, Marionette, $, _){
	
	var NoBlogsView = Marionette.ItemView.extend({
		template:"#blog-list-none",
		tagName:"div",
		className:"alert"
	});
	
	List.BlogView = Marionette.ItemView.extend({
		tagName:'div',
		template:'#blog-item-template',
		events:{
			"click":"highlightName"
		},
		
		highlightName: function(){
			this.$el.toggleClass("warning");
		},

		flash:function(cssClass){
			var $view = this.$el;
			$view.hide().toggleClass(cssClass).fadeIn(800,function(){
				setTimeout(function(){
					$view.toggleClass(cssClass);
				},500);
			});
		}
		
	});


	List.BlogCollectionView = Marionette.CollectionView.extend({
		emptyView:NoBlogsView,
		childView:List.BlogView,
		initialize:function(){
			this.listenTo(this.collection, "reset", function(){
				 this.appendHtml = function(collectionView, itemView, index){
					 collectionView.$el.append(itemView.el);
				 }
			});
		},
		onCompositeCollectionRendered:function(){
			this.appendHtml = function(collectionView, itemView, index){
				 collectionView.$el.prepend(itemView.el);
			}
		}
	});

});