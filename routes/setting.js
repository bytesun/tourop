var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Setting     = mongoose.model('Setting');

/**
 * create a new ROUTE
 */
router.post('/api/setting', function(req, res) {

	new Setting(req.body).save( function( err, setting){
		if(err){
			return res.send({error:err});
		}else{
			console.log('success save setting:'+setting);
			res.send(setting);	
		}
		
	  });
});


router.put('/api/setting/:id', function(req, res) {

	Setting.findByIdAndUpdate(
			req.params.id,
//			req.body,
			{$set:{	
				tourcom:req.body.tourcom,
				finance:req.body.finance
//					name:req.body.name,
//					phone:req.body.phone,
//					fax:req.body.fax,
//					email:req.body.email,
//					contact:req.body.contact,
//					regno:req.body.regno,
//					address:req.body.address,
//					city:req.body.city,
//					province:req.body.province,
//					country:req.body.country,
//					postcode:req.body.postcode,
//				commission:req.body.commission
				}},
			function( err, setting){
		if(err){
			return res.send({error:err});
		}
		res.send(setting);
	  });
});
/**
 * get a case by id
 */
router.get('/api/setting/:id',function(req,res){
	Setting.findById(req.params.id,function(err,setting){
		res.send(setting);
	});
});

router.get('/api/setting',function(req,res){
	res.set('Content-Type', 'application/json');
	Setting.findOne(null,
				null,
				null,function(err,settings){
			res.send(settings);
	});
	

});

router.delete('/api/setting',function(req,res){
	Setting.remove(function(err,count){
		res.send({error:err,count:count});
	});
});

router.delete('/api/setting/:id',function(req,res){
	Setting.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;