var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Payable     = mongoose.model('Payable');



/**
 * create a new Payable
 */
router.post('/api/payable', function(req, res) {

	new Payable(req.body).save( function( err, payable){
		if(err){
			console.error('failed to save payable with error :'+err);
			return res.send({error:err});
		}else{
			console.log('success save payable:'+payable);
			res.send(payable);	
		}
		
	  });
});
router.put('/api/payable/:id', function(req, res) {
	Payable.findByIdAndUpdate(
			req.params.id,
			{$set:{
				invoice : req.body.invoice,
				amount:req.body.amount,
				tax:req.body.tax,
				total:req.body.total,
				date:new Date()
				}},
			function( err, payable){
		if(err){
			return res.send({error:err});
		}
		res.send(payable);
	  });
});
router.get('/api/payables',function(req,res){
	res.set('Content-Type', 'application/json');

	var c = req.query.tourcode;//tour code
	var query = {};
	if(c != undefined && c != ''){
		query = {'tour':c};
	}else{
		query = {'total':0} //only show unpayed
	}
	console.log('fetch payables query :'+JSON.stringify(query));
	Payable.find(query,
				null,
				null,function(err,payables){
			console.log('fetch payables :'+payables);
			res.send(payables);
	});
	

});
router.delete('/api/payable/:id',function(req,res){
	Payable.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});


module.exports = router;