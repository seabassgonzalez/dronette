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
					src={state? state.profilePic : "Loading..."}
					/>
				</div>
				<div>
					<h4>{state ? state.name : "loading"}</h4>
					<h5>{state ? state.email : "loading"}</h5>
					<div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
						<h6>{mypics.length} posts</h6>
						<h6>{state?state.followers.length:"Loading..."} followers</h6>
						<h6>{state?state.following.length:"Loading..."} following</h6>
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