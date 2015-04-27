var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Hotel     = mongoose.model( 'Hotel' );

/**
 * create a new case
 */
router.post('/api/hotels', function(req, res) {

	new Hotel(req.body).save( function( err, hotel){
		if(err){
			//req.flash('error', err);
			return res.send({error:err});
		}
		//req.flash('success','Post a blog!');
		res.send(hotel);
	  });
});

/**
 * get a case by id
 */
router.get('/api/hotels/:id',function(req,res){
	Hotel.findById(req.params.id,function(err,hotel){
		res.send(hotel);
	});
});

router.get('/api/hotels',function(req,res){
	res.set('Content-Type', 'application/json');
	Hotel.find(null,
				null,
				null,function(err,hotels){
			res.send(hotels);
	});
	

});

router.delete('/api/hotels',function(req,res){
	Hotel.remove(null,function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;