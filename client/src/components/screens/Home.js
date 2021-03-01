import React, {useState, useEffect} from 'react';

const Home = () => {
	const [data, setData] = useState([]);
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
			console.log(result)
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
								<i className="material-icons">thumb_up</i>
								<i className="material-icons">thumb_down</i>
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