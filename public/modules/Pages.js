define([
    'app',
    'marionette',
    'routers/index',
    'controllers/index'
], function(app, Marionette, Router, Controller){
 
    var PagesModule = app.module("Pages", function(Pages) {
        this.startWithParent = false;

        this.addInitializer(function(){
            console.log('Module:Pages => initialized');

            this.router = new Router({ controller: Controller });
        });
        
        Information = Backbone.Model.extend({
  	       urlRoot: '/api/infos',
	       idAttribute: '_id',

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });
 	
 	
 	  // Creates a new Backbone Collection class object
 	Collection = Backbone.Collection.extend({
 	      url: '/api/infos',
 	      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
 	      model: Information

 	    });
 	
 	
 	var API = {
 		getInformations:function(){
 			console.log('calling API.getInforamtions');
 			var infos = new Collection();
 			var defer = $.Deferred();
 			infos.fetch({
 				success:function(data){
 					defer.resolve(data);
 				}
 			});	
 			var promise = defer.promise();
 			$.when(promise).done(function(infos){
 				if(infos.length === 0){
 					
 				}
 			});
 			return promise;
 		},
 		getInformation:function(id){
 			var info = new Model({'_id':id});
 			var defer = $.Deferred();
 			//setTimeout(function(){
 				info.fetch({
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
 	
 	app.reqres.setHandler("entities:informations", function(){
 		console.log('calling app request info');
 		 return API.getInformations();
 	 });
 	
 	app.reqres.setHandler("information:entity",function(id){
 		return API.getInformation(id);
 	});


    });

    return PagesModule;
});