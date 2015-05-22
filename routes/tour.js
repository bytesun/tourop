var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Tour     = mongoose.model('Tour');

/**
 * create a new ROUTE
 */
router.post('/api/tours', function(req, res) {
	console.log('post tour data'+JSON.stringify(req.body));

	new Tour(req.body).save( function( err, tour){
		if(err){
			return res.send({error:err});
		}else{
			console.log('success save tour:'+tour);
			res.send(tour);	
		}
		
	  });
});


router.put('/api/tours/:id', function(req, res) {

	Tour.findByIdAndUpdate(
			req.params.id,
//			req.body,
			{$set:{				
				code:req.body.code,
				name:req.body.name,
				days:req.body.days,
				op:req.body.op,
				guide:req.body.guide,
				departuredate:req.body.departuredate,
				status:req.body.status,
				note:req.body.note,
				feedback:req.body.feedback,
				route:req.body.route,
				schedule:req.body.schedule,
				group:req.body.group,
				bus:req.body.bus
				}},
			function( err, tour){
		if(err){
			return res.send({error:err});
		}
		res.send(tour);
	  });
});
/**
 * get a case by id
 */
router.get('/api/tours/:id',function(req,res){
	Tour.findById(req.params.id,function(err,tour){
		res.send(tour);
	});
});

router.get('/api/tours',function(req,res){
	res.set('Content-Type', 'application/json');

	var c = req.query.c;
	var query = {};
	if(c != 0){
		query.code = new RegExp('^'+c, "i");
	}else{
		query.status={$in:['New','Confirmed']};
	}
	
	console.log('query tour is ',query);
	
	Tour.find(query,
				null,
				null,function(err,tours){
			res.send(tours);
	});
	

});

router.delete('/api/tours',function(req,res){
	Tour.remove(function(err,count){
		res.send({error:err,count:count});
	});
});

router.delete('/api/tours/:id',function(req,res){
	Tour.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;