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
    'collections/Tours',
    'models/Confirmation',
    'collections/Confirmations',
    'models/Invoice',
    'collections/Invoices',
    'models/Setting',
    'models/Payable',
    'collections/Payables',
    'models/User',
    'collections/Users'
    

    
], function(app, Marionette, Router, Controller,
		Information,
		Informations,
		Route,
		Routes,
		Tour,
		Tours,
		Confirmation,
		Confirmations,
		Invoice,
		Invoices,
		Setting,
		Payable,Payables,
		User,Users){
 
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
 		fetchInformation:function(code){
 			var info = new Information();
 			var defer = $.Deferred();
 			//setTimeout(function(){
 				info.fetch({
 					data:$.param({code:code}),
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
 		} ,
 		getSetting:function(){
 			console.log('calling API.getSetting');
 			var setting = new Setting();
 			var defer = $.Deferred();
 			//setTimeout(function(){
 			setting.fetch({
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
		getConfirmations:function(query){
 			console.log('calling API.getConfirmations');
 			var confirmations = new Confirmations();
 			var defer = $.Deferred();
 			confirmations.fetch({
 				data:$.param(query),
 				success:function(data){
 					defer.resolve(data);
 				}
 			});	
 			var promise = defer.promise();
 			$.when(promise).done(function(confirmatons){
 				if(confirmatons.length === 0){
 					
 				}
 			});
 			return promise;
 		},
 		getConfirmation:function(id){
 			console.log('fetching Confirmation :'+id);
 			var confirmation = new Confirmation({'_id':id});
 			var defer = $.Deferred();
 			//setTimeout(function(){
 				confirmation.fetch({
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
		getInvoices:function(query){
 			console.log('calling API.getInvoices:'+query);
 			var invoices = new Invoices();
 			var defer = $.Deferred();
 			invoices.fetch({
 				data:$.param(query),
 				success:function(data){
 					defer.resolve(data);
 				}
 			});	
 			var promise = defer.promise();
 			$.when(promise).done(function(confirmatons){
 				if(confirmatons.length === 0){
 					
 				}
 			});
 			return promise;
 		},
 		getInvoice:function(id){
 			console.log('fetching Invoice :'+id);
 			var invoice = new Invoice({'_id':id});
 			var defer = $.Deferred();
 			//setTimeout(function(){
 				invoice.fetch({
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

		getPayables:function(query){
 			console.log('calling API.getPayables:'+query);
 			var payables = new Payables();
 			var defer = $.Deferred();
 			payables.fetch({
 				data:$.param(query),
 				success:function(data){
 					defer.resolve(data);
 				}
 			});	
 			var promise = defer.promise();
 			$.when(promise).done(function(payables){
 				if(payables.length === 0){
 					
 				}
 			});
 			return promise;
 		}, 
        getUsers:function(query){
 			console.log('calling API.getUsers:'+query);
 			var users = new Users();
 			var defer = $.Deferred();
 			users.fetch({
 				data:$.param(query),
 				success:function(data){
 					defer.resolve(data);
 				}
 			});	
 			var promise = defer.promise();
 			$.when(promise).done(function(users){
 				if(users.length === 0){
 					
 				}
 			});
 			return promise;
 		},  		
 	};
 	
 	app.reqres.setHandler("entities:informations", function(query){
 		console.log('calling app request info'+query);
 		 return API.getInformations(query);
 	 });
 	
 	app.reqres.setHandler("information:entity",function(id){
 		return API.getInformation(id);
 	});
 	app.reqres.setHandler("information:entity:fetch",function(code){
 		return API.fetchInformation(code);
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
 	
 	app.reqres.setHandler("setting:entity",function(){
 		return API.getSetting();
 	}); 
 	
 	app.reqres.setHandler("confirmation:entity",function(id){
 		return API.getConfirmation(id);
 	});
 	
 	app.reqres.setHandler("entities:confirmations",function(query){
 		return API.getConfirmations(query);
 	}); 
 	
 	app.reqres.setHandler("invoice:entity",function(id){
 		return API.getInvoice(id);
 	});
 	
	
 	app.reqres.setHandler("entities:invoices",function(query){
 		return API.getInvoices(query);
 	}); 
 	app.reqres.setHandler("entities:payables",function(query){
 		return API.getPayables(query);
 	}); 
 	
 	app.reqres.setHandler("entities:users",function(query){
 		return API.getUsers(query);
 	});  	
    });

    return PagesModule;
});