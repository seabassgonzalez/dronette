import React, {useState, useEffect} from 'react';

const Home = () => {
	const [data, setData] = useState([]);
	useEffect(()=>{
		fetch('/allposts', {
			headers:{
				"Authorization":"Bearer " + localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
		.then
	}, []);
	return (
		<div className="home">
			<div className="card home-card">
				<h5>Sebastian</h5>
				<div className="card-image">
					<img src="https://images.unsplash.com/photo-1602548568341-13511c551dcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
				</div>
				<div className="card-content">
					<i className="material-icons" style={{color:"red"}}>favorite</i>
					<h6>Title</h6>
					<p>This amazing post</p>
					<input type="text" placeholder="add a comment" />
				</div>
			</div>
			<div className="card home-card">
				<h5>Sebastian</h5>
				<div className="card-image">
					<img src="https://images.unsplash.com/photo-1602548568341-13511c551dcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
				</div>
				<div className="card-content">
					<i className="material-icons" style={{color:"red"}}>favorite</i>
					<h6>Title</h6>
					<p>This amazing post</p>
					<input type="text" placeholder="add a comment" />
				</div>
			</div>
			<div className="card home-card">
				<h5>Sebastian</h5>
				<div className="card-image">
					<img src="https://images.unsplash.com/photo-1602548568341-13511c551dcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
				</div>
				<div className="card-content">
					<i className="material-icons" style={{color:"red"}}>favorite</i>
					<h6>Title</h6>
					<p>This amazing post</p>
					<input type="text" placeholder="add a comment" />
				</div>
			</div>
			<div className="card home-card">
				<h5>Sebastian</h5>
				<div className="card-image">
					<img src="https://images.unsplash.com/photo-1602548568341-13511c551dcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
				</div>
				<div className="card-content">
					<i className="material-icons" style={{color:"red"}}>favorite</i>
					<h6>Title</h6>
					<p>This amazing post</p>
					<input type="text" placeholder="add a comment" />
				</div>
			</div>
		</div>
	);
};

export default Home;