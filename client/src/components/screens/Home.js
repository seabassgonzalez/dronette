import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App';

const Home = () => {
	const [data, setData] = useState([]);
	// for access to user who's logged in, use context
	const {state, dispatch} = useContext(UserContext);
	useEffect(()=>{
		fetch('/allposts', {
			headers:{
				"Authorization":"Bearer " + localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
		.then(result=>{
			console.log(result);
			setData(result.posts);
		});		
	}, []);
	
	const likePost = (id) => {
		fetch('/like', {
			method: "put", 
			headers: {
				"Content-Type":"application/json",
				"Authorization":"Bearer " + localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				postId:id
			})
		}).then(res=>res.json())
		.then(result=>{
			console.log(result);
			const newData = data.map(item=>{
				if(item._id == result._id){
					return result;
				}else{
					return item;
				}
			})
			setData(newData);
		}).catch(err=>{
			console.log(err);
		})
	};

	// unlikePost takes an id
		// fetch unlike route
			// put method and headers
			// body set to json string postId being passed in id
		// .then response to json
		// .then result
			// newData set to map over data for each item
				// if item _id == result _id
					// return result
				// else
					// return item
			// setData passing it newData
	const unlikePost = (id) => {
		fetch('/unlike', {
			method: "put", 
			headers: {
				"Content-Type":"application/json",
				"Authorization":"Bearer " + localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				postId:id
			})
		}).then(res=>res.json())
		.then(result=>{
			console.log(result);
			const newData = data.map(item=>{
				if(item._id == result._id){
					return result;
				}else{
					return item;
				}
			})
			setData(newData);
		}).catch(err=>{
			console.log(err);
		})
	};

	return (
		<div className="home">
			{
				data.map(item=>{	
					return(
						<div className="card home-card" key={item._id}>
							<h5>{item.postedBy.name}</h5>
							<div className="card-image">
								<img src={item.photo} />
							</div>
							<div className="card-content">
								<i className="material-icons" style={{color:"red"}}>favorite</i>
								{item.likes.includes(state._id)
									?
								<i className="material-icons"
									onClick={()=>{unlikePost(item._id)}}
								>thumb_down</i>
									: 
								<i className="material-icons"
									onClick={()=>{likePost(item._id)}}
								>thumb_up</i>
								}
								<h6>{item.likes.length} likes</h6>
								<h6>{item.title}</h6>
								<p>{item.body}</p>
								<input type="text" placeholder="add a comment" />
							</div>
						</div>
					);

				})
			}
			
		</div>
	);
};

export default Home;