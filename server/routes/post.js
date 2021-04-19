const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post =  mongoose.model("Post");

// allposts route, protected
	// populate postedBy and id and name
	// populate comments postedBy id and name
router.get('/allposts', requireLogin, (req, res) =>{
	Post.find()
	.populate("postedBy", "_id name")
	.populate("comments.postedBy", "_id name")
	.then(posts=>{
		res.json({posts});
	})
	.catch(err=>{
		console.log(err);
	});
});

// subscribed posts route, protected
	// find postedby in following list off logged in user
	// populate postedBy and id and name
	// populate comments postedBy id and name
router.get('/getsubposts', requireLogin, (req, res) =>{
	Post.find({postedBy:{$in:req.user.following}})
	.populate("postedBy", "_id name")
	.populate("comments.postedBy", "_id name")
	.then(posts=>{
		res.json({posts});
	})
	.catch(err=>{
		console.log(err);
	});
});

// /createpost a protected route
	// if no title body or photo
		// return error
	// set password to undefined
	// create post new instance of Post model
router.post('/createpost', requireLogin, (req, res) => {
	const {title, body, photo} = req.body;
	if(!title || !body || !photo){
		console.log(title, body, photo);
		return res.status(422).json({error: "Please add all fields here"});
	}
	console.log(req.user);
	req.user.password = undefined;
	const post = new Post({
		title,
		body,
		photo,
		postedBy: req.user
	});
	post.save().then(result=>{
		res.json({post:result})
	})
	.catch(err=>{
		console.log(err);
	});
});

router.get('/myposts', requireLogin, (req, res) => {
	Post.find({postedBy:req.user._id})
	.populate("PostedBy", "_id name")
	.then(myposts=>{
		res.json({myposts});
	})
	.catch(err=>{
		console.log(err);
	});
});

// can use .post, but .put better since updating likes
	// to the given post
		// pushing the id of the user currently logged in to likes array, accessing logged in user because middleware added in requireLogin
router.put('/like', requireLogin, (req,res) => {
	Post.findByIdAndUpdate(req.body.postId, {
		$push:{likes:req.user._id}
	}, {
		// to ensure that mongoDB returns a new record
		new:true
	}).exec((err, result) => {
		if(err){
			return (
				res.status(422).json({error:err})
			);
		}else{
			res.json(result);
		}
	});
});

// can use .post, but .put better since updating likes with unliking
	// to the given post
		// pulling the id of the user currently logged in to likes array, accessing logged in user because middleware added in requireLogin
router.put('/unlike', requireLogin, (req,res) => {
	Post.findByIdAndUpdate(req.body.postId, {
		$pull:{likes:req.user._id}
	}, {
		// to ensure that mongoDB returns a new record
		new:true
	}).exec((err, result) => {
		if(err){
			return (
				res.status(422).json({error:err})
			);
		}else{
			res.json(result);
		}
	});
});

router.put('/comment', requireLogin, (req,res) => {
	const comment = {
		text: req.body.text,
		//access user off token grab _id
		postedBy:req.user._id
	}
	Post.findByIdAndUpdate(req.body.postId, {
		$push:{comments:comment}
	}, {
		new:true
	})
	// populate comments postedBy to access more information inside comment
	// populate postedBy with _id and name
	.populate("comments.postedBy", "_id name")
	.populate("postedBy", "_id name")
	.exec((err, result) => {
		if(err){
			return (
				res.status(422).json({error:err})
			);
		}else{
			res.json(result);
		}
	});
});

router.delete('/deletepost/:postId', requireLogin, (req,res)=>{
	console.log(req.params);                                                  
	Post.findOne({_id:req.params.postId})
	.populate("postedBy", "_id")
	.exec((err, post) =>{
		if(err || !post){
			return res.status(422).json({error:err});
		}
		if(post.postedBy._id.toString() === req.user._id.toString()){
			post.remove()
			.then(result =>{
				res.json(result);
			}).catch(err=>{
				console.log(err);
			})
		}
	});
});

router.delete('/deletecomment/:commentId', requireLogin, (req,res)=>{
	console.log('req.params are ', req.params); 
	console.log('Post is ', Post);
	console.log('Post comments are ', comments);
	console.log('record is ', record);    

	req.params.commentId.findOne({_id:req.params.commentId})
	.populate("postedBy", "_id")
	.exec((err, post) =>{
		if(err || !post){
			return res.status(422).json({error:err});
		}
		if(post.postedBy._id.toString() === req.user._id.toString()){
			post.remove()
			.then(result =>{
				res.json(result);
			}).catch(err=>{
				console.log(err);
			})
		}
	});
});

module.exports = router;