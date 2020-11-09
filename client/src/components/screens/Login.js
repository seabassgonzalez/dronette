import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2>Dronette</h2>
				<input 
					type="text"
					placeholder="email"
				/>
				<input 
					type="text"
					placeholder="password"
				/>
				<button className="btn waves-effect waves-light #9b59b6 purple lighten-2">
					Login
				</button>
				<h6>
					<Link to="/signup">Don't already have an account?</Link>
				</h6>
			</div>
		</div>
	);
};

export default Login;