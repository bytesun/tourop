var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bCrypt = require('bcryptjs');

router.post('/api/users', function(req, res) {
	//default password
	req.body.password = bCrypt.hashSync('111111', bCrypt.genSaltSync(10), null);
	new User(req.body).save( function( err, user){
		if(err){
			return res.send({error:err});
		}
		res.send(user);
	  });
});

router.put('/api/users/:id', function(req, res) {
	var pwd = req.body.password;
	
	var setting = {
			username:req.body.username,
			displayname:req.body.displayname,
			email:req.body.email,
			role:req.body.role
			};
	if(pwd != null && pwd != '') {
		setting.password = bCrypt.hashSync(pwd, bCrypt.genSaltSync(10), null);
	}
	
	User.findByIdAndUpdate(
			req.params.id,
//			req.body,
			{$set:setting},
			function( err, user){
		if(err){
			return res.send({error:err});
		}

		res.send(user);
	  });
});

router.get('/api/users',function(req,res){
	res.set('Content-Type', 'application/json');

	
	User.find({},
				null,
				null,function(err,users){
			res.send(users);
	});
	

});
module.exports = router;