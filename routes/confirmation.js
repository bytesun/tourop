var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Confirmation     = mongoose.model('Confirmation');

/**
 * create a new ROUTE
 */
router.post('/api/confirmations', function(req, res) {
	console.log('post confirmation data'+JSON.stringify(req.body));

	new Confirmation(req.body).save( function( err, confirmation){
		if(err){
			return res.send({error:err});
		}else{
			console.log('success save confirmation:'+confirmation);
			res.send(confirmation);	
		}
		
	  });
});


router.put('/api/confirmations/:id', function(req, res) {
	var itinerarys = req.body.itinerary;
//	console.log('itinerary : '+JSON.stringify(itinerarys));
	Confirmation.findByIdAndUpdate(
			req.params.id,
//			req.body,
			{$set:{				
//				code:req.body.code,
//				name:req.body.name,
//				days:req.body.days,
//				op:req.body.op,
//				guide:req.body.guide,
//				departuredate:req.body.departuredate,
//				status:req.body.status,
//				note:req.body.note,
//				itinerary:req.body.itinerary,
//				group:req.body.group,
//				bus:req.body.bus
				}},
			function( err, confirmation){
		if(err){
			return res.send({error:err});
		}
		res.send(confirmation);
	  });
});
/**
 * get a case by id
 */
router.get('/api/confirmations/:id',function(req,res){
	Confirmation.findById(req.params.id,function(err,confirmation){
		res.send(confirmation);
	});
});

router.get('/api/confirmations',function(req,res){
	res.set('Content-Type', 'application/json');

	var c = req.query.c;
	var query = {};
	if(c != 0){
		query.code = new RegExp('^'+c, "i");
	}else{
		query.status={$in:['New','Confirm']};
	}
	
	console.log('query is '+JSON.stringify(query));
	
	Confirmation.find(null,
				null,
				null,function(err,confirmations){
			res.send(confirmations);
	});
	

});

router.delete('/api/confirmations',function(req,res){
	Confirmation.remove(function(err,count){
		res.send({error:err,count:count});
	});
});

router.delete('/api/confirmations/:id',function(req,res){
	Confirmation.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;