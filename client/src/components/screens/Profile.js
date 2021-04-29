import React, { useEffect, useState, useContext } from 'react';
import {UserContext} from '../../App';

const Profile = () => {
	const [mypics, setPics] = useState([]);
	const {state, dispatch} = useContext(UserContext);
	const [image, setImage] = useState("");
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
	
	useEffect(()=>{
		if(image){
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
				console.log('data when updating profile pic is ', data);
				fetch('/updateprofilepic',{
					method:"put",
					headers:{
						"Content-Type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("jwt")
					},
					body: JSON.stringify({
						profilePic: data.url
					})
				}).then(res=>res.json())
				.then(result=>{
					console.log(result);
					localStorage.setItem("user", JSON.stringify({...state, profilePic:result.profilePic}));
					dispatch({type:"UPDATEPROFILEPIC", payload:result.profilePic});
					// window.location.reload();
				})
			})
			.catch(err=>{
				console.log(err);
			});
		}
	}, [image]);

	const updateProfilePic = (file) =>{
		setImage(file);
	
	};

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
					<div className="file-field input-field">
						<div className="btn purple lighten-2">
							<span>Update Profile Pic</span>
							<input type="file" onChange={(e)=>updateProfilePic(e.target.files[0])} />
						</div>
						<div className="file-path-wrapper">
							<input className="file-path validate" type="text" />
						</div>
					</div>
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
							<img key={item._id} className="item gallerypic" src={item.photo} alt={item.title} />
						)
					})
				}
			</div>
		</div>
	);
};

export default Profile;