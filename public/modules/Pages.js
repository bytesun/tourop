define([
    'app',
    'marionette',
    'routers/index',
    'controllers/index',
    'models/Information',
    'collections/Informations',
    'models/Route',
    'collections/Routes',
    'models/Tour',
    'collections/Tours'
    
], function(app, Marionette, Router, Controller,
		Information,
		Informations,
		Route,
		Routes,
		Tour,
		Tours){
 
    var PagesModule = app.module("Pages", function(Pages) {
        this.startWithParent = false;

        this.addInitializer(function(){
            console.log('Module:Pages => initialized');

            this.router = new Router({ controller: Controller });
        });
        
 	
 	var API = {
 		getInformations:function(query){
 			console.log('calling API.getInforamtions');
 			var infos = new Informations();
 			var defer = $.Deferred();
 			infos.fetch({
 				data:$.param(query),
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
 			var info = new Information({'_id':id});
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
 		},
 		
		getRoutes:function(query){
 			console.log('calling API.getRoutes');
 			var routes = new Routes();
 			var defer = $.Deferred();
 			routes.fetch({
 				data:$.param(query),
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
 		getRoute:function(id){
 			console.log('fetching route :'+id);
 			var route = new Route({'_id':id});
 			var defer = $.Deferred();
 			//setTimeout(function(){
 				route.fetch({
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
 		},	
		getTours:function(query){
 			console.log('calling API.getTours');
 			var tours = new Tours();
 			var defer = $.Deferred();
 			tours.fetch({
 				data:$.param(query),
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
 		getTour:function(id){
 			console.log('fetching tour :'+id);
 			var tour = new Tour({'_id':id});
 			var defer = $.Deferred();
 			//setTimeout(function(){
 				tour.fetch({
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
 	
 	app.reqres.setHandler("entities:informations", function(query){
 		console.log('calling app request info'+query);
 		 return API.getInformations(query);
 	 });
 	
 	app.reqres.setHandler("information:entity",function(id){
 		return API.getInformation(id);
 	});
 	
 	app.reqres.setHandler("entities:routes", function(query){
 		console.log('calling app request info'+query);
 		 return API.getRoutes(query);
 	 });
 	
 	app.reqres.setHandler("route:entity",function(id){
 		return API.getRoute(id);
 	});

 	app.reqres.setHandler("entities:tours", function(query){
 		console.log('calling app request info'+query);
 		 return API.getTours(query);
 	 });
 	
 	app.reqres.setHandler("tour:entity",function(id){
 		return API.getTour(id);
 	});
    });

    return PagesModule;
});