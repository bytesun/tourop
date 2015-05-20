var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Route     = mongoose.model('Route');

/**
 * create a new ROUTE
 */
router.post('/api/routes', function(req, res) {
	console.log('post route data'+JSON.stringify(req.body));

	new Route(req.body).save( function( err, route){
		if(err){
			return res.send({error:err});
		}else{
			console.log('success save route:'+route);
			res.send(route);	
		}
		
	  });
});


router.put('/api/routes/:id', function(req, res) {
	var itinerarys = req.body.itinerary;
//	console.log('itinerary : '+JSON.stringify(itinerarys));
	Route.findByIdAndUpdate(
			req.params.id,
//			req.body,
			{$set:{
				code:req.body.code,
				name:req.body.name,
				days:req.body.days,
				note:req.body.note,
				fare:req.body.fare,
				meal:req.body.meal,
				admission:req.body.admission,
				schedule:req.body.schedule

				}},
			function( err, route){
		if(err){
			return res.send({error:err});
		}
		res.send(route);
	  });
});
/**
 * get a case by id
 */
router.get('/api/routes/:id',function(req,res){
	Route.findById(req.params.id,function(err,route){
		res.send(route);
	});
});

router.get('/api/routes',function(req,res){
	res.set('Content-Type', 'application/json');

	var c = req.query.c;
	var query = {};
	if(c != 0)query.code = new RegExp('^'+c, "i");
//	else query=null,
	console.log("query route: ",query);
	Route.find(query,
				null,
				null,function(err,routes){
			res.send(routes);
	});
	

});
//router.delete('/api/routes',function(req,res){
//	Route.remove(function(err,count){
//		res.send({error:err,count:count});
//	});
//});

router.delete('/api/routes/:id',function(req,res){
	Route.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;