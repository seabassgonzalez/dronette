const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	profilePic:{
		type: String,
		default: "https://res.cloudinary.com/dronette/image/upload/v1618603383/noimage_user_vcuy55.png"
	},
	followers:[{
		type: ObjectId,
		ref: "User"
	}],
	following:[{
		type: ObjectId,
		ref: "User"
	}]
});

mongoose.model("User", userSchema);