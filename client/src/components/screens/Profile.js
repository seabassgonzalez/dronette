import React, { useEffect, useState, useContext } from 'react';
import {UserContext} from '../../App';

const Profile = () => {
	const [mypics, setPics] = useState([]);
	const {state, dispatch} = useContext(UserContext);
	useEffect(() => {
		fetch('/myposts', {
			headers:{
				"Authorization":"Bearer " + localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
		.then(result=>{
			console.log(result);
			setPics(result.myposts);
		})
	}, []);
	return (
		<div style={{maxWidth:"550px", margin:"0px auto"}}>
			<div style={{
				display:"flex",
				justifyContent:"space-around",
				margin:"18px 0px",
				borderBottom:"1px solid grey"
			}}>
				<div>
					<img style={{width:"160px", height:"160px", borderRadius:"80px"}}
					src="https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s150x150/120075726_798496587650763_8285517711531601562_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=haWGw0aeICQAX_P5nP8&tp=1&oh=023f58eeb6cd52f5813e7208ec1bacac&oe=6051BF41"
					/>
				</div>
				<div>
					<h4>{state ? state.name : "loading"}</h4>
					<div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
						<h6>50 posts</h6>
						<h6>50 followers</h6>
						<h6>50 following</h6>
					</div>
				</div> 
			</div>
			<div className="gallery">
				{
					mypics.map(item=>{
						return (
							<img key={item._id} className="item" src={item.photo} alt={item.title} />
						)
					})
				}
			</div>
		</div>
	);
};

export default Profile;