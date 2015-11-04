var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Partner     = mongoose.model( 'Partner' );

/**
 * create a new case
 */
router.post('/api/partner', function(req, res) {

	new Partner(req.body).save( function( err, partner){
		if(err){
			return res.send({error:err});
		}
		res.send(partner);
	  });
});

/**
 * 	type : String, //A-agency/H-hotel/R-restaurant/S-admission
	code : String,
	name : String,
	telphone : String,
	contact : String,
	address : String,
	city: String,
	province: String,
	country :String,
	postcode:String,
	note: String
 */
router.put('/api/partner/:id', function(req, res) {
	Partner.findByIdAndUpdate(
			req.params.id,
			{$set:{
				type:req.body.type,
				code:req.body.code,
				name:req.body.name,
				name_cn:req.body.name_cn,
				payment:req.body.payment,
				telphone:req.body.telphone,
				fax:req.body.fax,
				contact:req.body.contact,
				cellphone:req.body.cellphone,
				email:req.body.email,
				address:req.body.address,
				city:req.body.city,
				province:req.body.province,
				country:req.body.country,
				postcode:req.body.postcode,
				note:req.body.note
				}},
			function( err, partner){
		if(err){
			return res.send({error:err});
		}
		res.send(partner);
	  });
});
/**
 * get a case by id
 */
router.get('/api/partner/:id',function(req,res){
	Partner.findById(req.params.id,function(err,partner){
		res.send(partner);
	});
});

router.get('/api/partner',function(req,res){
	res.set('Content-Type', 'application/json');
	Partner.findOne({code:req.query.code},
				null,
				null,function(err,partner){
			res.send(partner);
	});
	

});
router.get('/api/partners',function(req,res){
	res.set('Content-Type', 'application/json');

	var c = req.query.c;
	var t = req.query.t;
	var query = {};
	if(c != 0)query.code = new RegExp('^'+c, "i");
	if(t != 'ALL') query.type=t;
	
	Partner.find(query,
				null,
				null,function(err,partners){
			res.send(partners);
	});
	

});


router.delete('/api/partner/:id',function(req,res){
	Partner.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;