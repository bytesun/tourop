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
				
				fee_tour_adult:req.body.fee_tour_adult,
				fee_tour_senior:req.body.fee_tour_senior,
				fee_tour_youth:req.body.fee_tour_youth,
				fee_tour_child:req.body.fee_tour_child,
				fee_tour_infant:req.body.fee_tour_infant,

				fee_meal_adult:req.body.fee_meal_adult,
				fee_meal_senior:req.body.fee_meal_senior,
				fee_meal_youth:req.body.fee_meal_youth,
				fee_meal_child:req.body.fee_meal_child,
				fee_meal_infant:req.body.fee_meal_infant,

				fee_adm_adult:req.body.fee_adm_adult,
				fee_adm_senior:req.body.fee_adm_senior,
				fee_adm_youth:req.body.fee_adm_youth,
				fee_adm_child:req.body.fee_adm_child,
				fee_adm_infant:req.body.fee_tour_infant,			
				itinerary:req.body.itinerary,
				
				note:req.body.note
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
//	var t = req.query.t;
	var query = {};
	if(c != 0)query.code = new RegExp('^'+c, "i");
//	if(t != 'ALL') query.type=t;
	
	Route.find(query,
				null,
				null,function(err,routes){
//		console.log(routes);
			res.send(routes);
	});
	

});
router.delete('/api/routes',function(req,res){
	Route.remove(function(err,count){
		res.send({error:err,count:count});
	});
});

router.delete('/api/routes/:id',function(req,res){
	Route.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;