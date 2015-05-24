var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Invoice     = mongoose.model('Invoice');

/**
 * create a new ROUTE
 */
router.post('/api/invoices', function(req, res) {
	console.log('post invoice data'+JSON.stringify(req.body));

	new Invoice(req.body).save( function( err, invoice){
		if(err){
			return res.send({error:err});
		}else{
			console.log('success save invoice:'+invoice);
			res.send(invoice);	
		}
		
	  });
});


router.put('/api/invoices/:id', function(req, res) {
	Invoice.findByIdAndUpdate(
			req.params.id,
			{$set:{		
            	remark:req.body.remark
				}},
			function( err, invoice){
		if(err){
			return res.send({error:err});
		}
		res.send(invoice);
	  });
});
/**
 * get a case by id
 */
router.get('/api/invoices/:id',function(req,res){
	Invoice.findById(req.params.id,function(err,invoice){
		res.send(invoice);
	});
});

router.get('/api/invoices',function(req,res){
	res.set('Content-Type', 'application/json');

	var c = req.query.c;//tour code
	var query = {};
	if(c != 0){
		query.tourcode = new RegExp('^'+c, "i");
	}
	
	console.log('query is '+JSON.stringify(query));
	
	Invoice.find(query,
				null,
				null,function(err,invoices){
			res.send(invoices);
	});
	

});

router.delete('/api/invoices',function(req,res){
	Invoice.remove(function(err,count){
		res.send({error:err,count:count});
	});
});

router.delete('/api/invoices/:id',function(req,res){
	Invoice.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;