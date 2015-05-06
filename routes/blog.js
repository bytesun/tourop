var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Blog     = mongoose.model( 'Blog' );

/**
 * create a new case
 */
router.post('/blogs', function(req, res) {
	var blog = {
			title : req.body.title,
			content : req.body.content,
			tag : req.body.tag,
			time: new Date()
	};
	new Blog(blog).save( function( err, blog){
		if(err){
			//req.flash('error', err);
			return res.redirect('/orcsun');
		}
		//req.flash('success','Post a blog!');
		res.redirect('/');
	  });
});

/**
 * get a case by id
 */
router.get('/blogs/:id',function(req,res){
	Blog.findById(req.params.id,function(err,blog){
		res.send(blog);
	});
});

router.get('/blogs',function(req,res){
	res.set('Content-Type', 'application/json');
	Blog.find(null,
				null,
				null,function(err,blogs){
			res.send(blogs);
	});
	

});

router.delete('/blogs',function(req,res){
	Blog.remove(null,function(err,count){
		res.send({error:err,count:count});
	});
});

module.exports = router;