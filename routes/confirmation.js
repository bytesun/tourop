var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Confirmation     = mongoose.model('Confirmation');

/**
 * create a new ROUTE
 */
router.post('/api/confirmation', function(req, res) {
//	console.log('post confirmation data'+JSON.stringify(req.body));

	new Confirmation(req.body).save( function( err, confirmation){
		if(err){
			return res.send({error:err});
		}else{
//			console.log('success save confirmation:'+confirmation);
			res.send(confirmation);	
		}
		
	  });
});


router.put('/api/confirmation/:id', function(req, res) {
	Confirmation.findByIdAndUpdate(
			req.params.id,
			{$set:{		
				no:req.body.no,
            	tourcode:req.body.tourcode,
            	groupno:req.body.groupno,
            	tourname:req.body.tourname,
            	departuredate:req.body.departuredate,
            	issuedate:req.body.issuedate,
            	bookdate:req.body.bookdate,
            	op:req.body.op,
        		pickup:req.body.pickup,
        		dropoff:req.body.dropoff,
            	remark:req.body.remark,
            	tourcom:req.body.tourcom,
            	agency:req.body.agency,
            	passenger:req.body.passenger
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
router.get('/api/confirmation/:id',function(req,res){
	Confirmation.findById(req.params.id,function(err,confirmation){
		res.send(confirmation);
	});
});

router.get('/api/confirmations',function(req,res){
	res.set('Content-Type', 'application/json');

	var c = req.query.c;//tour code
	var query = {};
	if(c != 0){
		query.tourcode = new RegExp('^'+c, "i");
	}
	
	console.log('query is '+JSON.stringify(query));
	
	Confirmation.find(query,
				null,
				null,function(err,confirmations){
			res.send(confirmations);
	});
	

});

//router.delete('/api/confirmations',function(req,res){
//	Confirmation.remove(function(err,count){
//		res.send({error:err,count:count});
//	});
//});

router.delete('/api/confirmation/:id',function(req,res){
	Confirmation.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;