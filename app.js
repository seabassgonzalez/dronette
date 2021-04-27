const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
// add dynamic port for heroku to choose port
const PORT = process.env.PORT || 5000;	
const { MONGOURI } = require('./config/keys');


mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
	console.log("Connected to mongo");
});

mongoose.connection.on('error', (err) => {
	console.log("Error connecting ", err);
});

require('./models/user');
require('./models/post');
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

// if in production
	// serve static file
	// if client makes any request
		// 	send index.html file from build folder 
if(process.env.NODE_ENV=="production"){
	app.use(express.static('client/build'));
	const path = require('path');
	app.get("*", (req, res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	})
};

app.listen(PORT, () => {
	console.log("Server is running on ", PORT);
});