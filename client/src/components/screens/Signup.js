import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Login = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState("");
	const [url, setUrl] = useState(undefined);
	useEffect(()=>{
		if(url){
			uploadFields();
		}
	}, [url]);

	const uploadFields = () => {
		if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
			M.toast({html: "invalid email", classes: "#c62828 red darken-3"});
			return;
		}
		fetch("http://localhost:5000/signup", {
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				name,
				password,
				email,
				profilePic:url
			})
		}).then(res=>res.json())
			.then(data=>{
				if(data.error){
					M.toast({html: data.error, classes: "#c62828 red darken-1"});
				} else {
					M.toast({html: data.message, classes: "#43a047 green darken-1"});
					history.push('/login');
				}
			}).catch(err=>{
				console.log(err);
			});
	}

	const uploadProfilePic = () => {
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "dronette");
		data.append("cloud_name", "dronette");
		fetch("https://api.cloudinary.com/v1_1/dronette/image/upload", {
			method: "post",
			body:data
		})
		.then(res=>res.json())
		.then(data=>{
			setUrl(data.url);
		})
		.catch(err=>{
			console.log(err);
		});
	};

	const PostData = () => {
		if(image){
			uploadProfilePic();
		}else{
			uploadFields();
		}
	};

	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2>Dronette</h2>
				<input 
					type="text"
					placeholder="name"
					value={name}
					onChange={(e)=>setName(e.target.value)}
				/>
				<input 
					type="text"
					placeholder="email"
					value={email}
					onChange={(e)=>setEmail(e.target.value)}
				/>
				<input 
					type="password"
					placeholder="password"
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
				/>
				<div className="file-field input-field">
					<div className="btn purple lighten-2">
						<span>Upload Profile Pic</span>
						<input type="file" onChange={(e)=>setImage(e.target.files[0])} />
					</div>
					<div className="file-path-wrapper">
						<input className="file-path validate" type="text" />
					</div>
				</div>
				<button className="btn waves-effect waves-light #64b5f6 purple lighten-2"
				onClick={()=>PostData()}
				>
					Sign Up
				</button>
				<h6>
					<Link to="/login">Already have an account?</Link>
				</h6>
			</div>
		</div>
	);
};

export default Login;