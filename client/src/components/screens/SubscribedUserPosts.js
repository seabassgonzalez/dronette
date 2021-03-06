import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App';
import {Link} from 'react-router-dom';

const Home = () => {
	const [data, setData] = useState([]);
	// for access to user who's logged in, use context
	const {state, dispatch} = useContext(UserContext);
	useEffect(()=>{
		fetch('/getsubposts', {
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

	const makeComment = (text, postId) => {
		fetch('/comment', {
			method: "put",
			headers: {
				"Content-Type":"application/json",
				"Authorization":"Bearer " + localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				postId,
				text
			})
		}).then(res=>res.json())
		.then(result => {
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

	const deletePost = (postid)=>{
		fetch(`/deletepost/${postid}`, {
			method:"delete",
			headers:{
				Authorization:"Bearer " + localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
		.then(result=>{
			console.log(result);
			const newData = data.filter(item=>{
				return item._id !== result._id;
			})
			setData(newData)
		})
	};
 
	const deleteComment = (recordid) => {
		console.log("this is the commentid: ", recordid);
	};

	const postsArray = data; 
	const postsReversed = [...postsArray].reverse();
	
	return (
		<div className="home">
			{
				postsReversed.map(item=>{	
					console.log('postsArray = ', postsArray)
					console.log('postsReversed = ', postsReversed)
					return(
						<div className="card home-card" key={item._id}>
							<h5><Link to={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id : "/profile/"}>{item.postedBy.name}</Link>{item.postedBy._id == state._id
								&& <i className="material-icons" style={{
									float: "right"
							}}
							onClick={()=>deletePost(item._id)}
							>delete</i>
							}</h5>
							<div className="card-image">
								<img src={item.photo} />
							</div>
							<div className="card-content">
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
								{
									item.comments.map(record=>{
										console.log("this is the record: ", record)
										return(
											<h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}{item.postedBy._id == state._id
								&& <i className="material-icons" style={{
									float: "right"
							}}
							onClick={()=>deleteComment(record._id)}
							>delete</i>
							}</h6>
										);
									})
								}
								<form onSubmit={(e)=>{
									e.preventDefault()
									console.log(e.target[0].value)
									makeComment(e.target[0].value, item._id)
								}}>
									<input type="text" placeholder="add a comment" />
								</form>
							</div>
						</div>
					);

				})
			}
			
		</div>
	);
};

export default Home;