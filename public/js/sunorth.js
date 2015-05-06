Sunorth = new Backbone.Marionette.Application();

Sunorth.addRegions({
	  mainRegion: "#main-region"
	});

Sunorth.on("start", function(){
	 if(Backbone.history){
		 Backbone.history.start();
		 Sunorth.trigger('blogs:list');
	 }
});
$(document).ready(function() {
	console.log('start sunorth');
	 Sunorth.start();
});

