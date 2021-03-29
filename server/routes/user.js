const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post =  mongoose.model("Post");
const User = mongoose.model("User");

// find user
	// find posts created by user

router.get('/user/:id', requireLogin, (req, res) => {
	User.findOne({_id:req.params.id})
	.select("-password")
	.then(user=>{
		Post.find({postedBy:req.params.id})
		.populate("postedBy","_id name")
		.exec((err, posts)=>{
			if(err){
				return res.status(422).json({error:err});
			}
			res.json({user, posts});
		})
	}).catch(err=>{
		return res.status(404).json({error: "User not found"});
	})
});

// follow
	// find user by id and update with followId
		// push user._id to followers array
router.put('follow', requireLogin, (req, res)=>{
	User.findByIdAndUpdate(req.body.followId, {
		$push:{followers:req.user._id}
	}, {
		new:true
	}, (err, result)=>{
		if(err){
			return res.status(422).json({error: err});
		}
		User.findByIdAndUpdate(req.user._id, {
			$push:{following:req.body.followId}
		},{new:true}).then(result=>{
			res.json(result);
		}).catch(err=>{
			return res.status(422).json({error:err});
		})
	})
})

module.exports = router;