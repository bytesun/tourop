var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Information     = mongoose.model( 'Information' );

/**
 * create a new case
 */
router.post('/api/infos', function(req, res) {

	new Information(req.body).save( function( err, info){
		if(err){
			return res.send({error:err});
		}
		res.send(info);
	  });
});

/**
 * get a case by id
 */
router.get('/api/infos/:id',function(req,res){
	Information.findById(req.params.id,function(err,info){
		res.send(info);
	});
});

router.get('/api/infos',function(req,res){
	res.set('Content-Type', 'application/json');
	Information.find(null,
				null,
				null,function(err,infos){
			res.send(infos);
	});
	

});

router.delete('/api/infos',function(req,res){
	Information.remove(null,function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;