var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bCrypt = require('bcryptjs');

router.put('/api/users/:id', function(req, res) {
	var pwd = req.body.password;
	
	var setting = {
			displayname:req.body.displayname,
			email:req.body.email
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

module.exports = router;