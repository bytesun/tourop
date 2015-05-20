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
router.put('/api/info/:id', function(req, res) {
	Information.findByIdAndUpdate(
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
			function( err, info){
		if(err){
			return res.send({error:err});
		}
		res.send(info);
	  });
});
/**
 * get a case by id
 */
router.get('/api/info/:id',function(req,res){
	Information.findById(req.params.id,function(err,info){
		res.send(info);
	});
});

router.get('/api/info',function(req,res){
	res.set('Content-Type', 'application/json');
	Information.findOne({code:req.query.code},
				null,
				null,function(err,information){
			res.send(information);
	});
	

});
router.get('/api/infos',function(req,res){
	res.set('Content-Type', 'application/json');

	var c = req.query.c;
	var t = req.query.t;
	var query = {};
	if(c != 0)query.code = new RegExp('^'+c, "i");
	if(t != 'ALL') query.type=t;
	
	Information.find(query,
				null,
				null,function(err,infos){
			res.send(infos);
	});
	

});


router.delete('/api/infos/:id',function(req,res){
	Information.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;