import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2>Dronette</h2>
				<input 
					type="text"
					placeholder="name"
				/>
				<input 
					type="text"
					placeholder="email"
				/>
				<input 
					type="text"
					placeholder="password"
				/>
				<button className="btn waves-effect waves-light #64b5f6 purple lighten-2">
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