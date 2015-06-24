var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Invoice     = mongoose.model('Invoice');
var Counter = mongoose.model('Counter');

/**
 * create a new ROUTE
 */
router.post('/api/invoice', function(req, res) {
//	console.log('post invoice data'+JSON.stringify(req.body));
	Counter.findOneAndUpdate(
            {countername: 'invoiceno'},
            {$inc: { seq: 1 } },
//            {new:true},
            function(err,doc){
           	 if(err){
           		 console.log('error :'+err);
           	 }else{
           		var invoiceno = doc.seq;
           		if(doc.seq<10)invoiceno='000'+doc.seq;
           		else if(doc.seq<100)invoiceno='00'+doc.seq;
           		else if(doc.seq<1000)invoiceno='0'+doc.seq;
           		var invoice = new Invoice(req.body);
           		invoice.set({'no':invoiceno});
           		invoice.save( function( err, invoice){
           			if(err){
           				console.log('error : '+err);
           				return res.send({error:err});
           			}else{
           				res.send(invoice);	
           			}
           			
           		  });

           	 }
            }
  );
	});


router.put('/api/invoice/:id', function(req, res) {
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
router.get('/api/invoice/:id',function(req,res){
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
	
	console.log('invoice query is '+JSON.stringify(query));
	
	Invoice.find(query,
				null,
				null,function(err,invoices){
			res.send(invoices);
	});
	

});

//update invoice status
router.post('/api/invoice/status', function(req, res) {
//	console.log('post invoice data'+JSON.stringify(req.body));
	Invoice.findOneAndUpdate(
            {countername: 'invoiceno'},
            {$inc: { seq: 1 } },
            {new:true},
            function(err,doc){
           	 if(err){
           		 console.log('error :'+err);
           	 }else{
           		var invoiceno = doc.seq;
           		if(doc.seq<10)invoiceno='000'+doc.seq;
           		else if(doc.seq<100)invoiceno='00'+doc.seq;
           		else if(doc.seq<1000)invoiceno='0'+doc.seq;
           		var invoice = new Invoice(req.body);
           		invoice.set({'no':invoiceno});
           		invoice.save( function( err, invoice){
           			if(err){
           				console.log('error : '+err);
           				return res.send({error:err});
           			}else{
           				res.send(invoice);	
           			}
           			
           		  });

           	 }
            }
  );
	});

//router.delete('/api/invoices',function(req,res){
//	Invoice.remove(function(err,count){
//		res.send({error:err,count:count});
//	});
//});

router.delete('/api/invoice/:id',function(req,res){
	Invoice.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});



module.exports = router;