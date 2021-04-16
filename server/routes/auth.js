const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/requireLogin');

router.post('/signup', (req, res) => {
	console.log(req.body);
	const {name, email, password, profilePic} = req.body;
	if(!email || !password || !name){
		return res.status(422).json({error:"Please add all the fields"});
	}
	
	User.findOne({email:email})
	.then((savedUser) => {
		if(savedUser){
			return res.status(422).json({error:"User already exists with that email"});
		}
		bcrypt.hash(password, 12)
		.then(hashedpassword=>{
			const user = new User({
				email,
				password:hashedpassword,
				name,
				profilePic
			});
			user.save()
			.then(user=>{
				res.json({message:"Saved Successfully"});
			})
			.catch(err=>{
				console.log(err);
			});
		});
	})
	.catch(err=>{
		console.log(err);
	});
});

// post to login route
	// set email and password to req.body
	// check if no email or no password
		// return error
	// find email
		// if no saved usesr
			// return error
		// compare password and saved password using bcrypt library
			// if match
				// set token
				// set id name email followers and following to savedUser
				// pass json response of token and user
			// else
				// return error
router.post('/login', (req, res) => {
	const {email, password} = req.body;
	if(!email || !password){
		return res.status(422).json({error:"Please add email and password"});
	}
	User.findOne({email:email})
	.then(savedUser=>{
		if(!savedUser){
			return res.status(422).json({error:"Invalid email or password"});
		}
		bcrypt.compare(password, savedUser.password)
		.then(doMatch=>{
			if(doMatch){
				const token = jwt.sign({_id:savedUser._id}, JWT_SECRET);
				const {_id, name, email, followers, following, profilePic} = savedUser;
				res.json({token, user:{_id, name, email, followers, following, profilePic}});
			} else {
				return res.status(422).json({error:"Invalid email or password"});
			}
		})
		.catch(err=>{
			console.log(err);
		});
	});
});

module.exports = router;