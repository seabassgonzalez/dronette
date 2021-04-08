import React, { useEffect, useState, useContext } from 'react';
import {UserContext} from '../../App';
import {useParams} from 'react-router-dom';

const Profile = () => {
	const [userProfile, setProfile] = useState(null);
	const {state, dispatch} = useContext(UserContext);
	const {userid} = useParams();
	console.log(userid)
	useEffect(() => {
		fetch(`/user/${userid}`, {
			headers:{
				"Authorization":"Bearer " + localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
		.then(result=>{
			console.log('result of fetch to user/userid is: ', result);
			setProfile(result);
		})
	}, []);

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        	console.log(data);
        	dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}});
        	localStorage.setItem("user", JSON.stringify(data));
        	setProfile((prevState)=>{
        		return {
        			...prevState,
        			user:data
        		};
        	});
        })
    }
	return (
		<>
		{userProfile ? 
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
							<h4>{userProfile.user.name}</h4>
							<h5>{userProfile.user.email}</h5>
							<div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
								<h6>{userProfile.posts.length} posts</h6>
								<h6>{userProfile.user.followers.length} followers</h6>
								<h6>{userProfile.user.following.length} following</h6>
							</div>
							<button className="btn waves-effect waves-light #9b59b6 purple lighten-2"
							onClick={()=>followUser()}
							>
							Follow
							</button>
						</div> 
					</div>
					<div className="gallery">
						{
							userProfile.posts.map(item=>{
								return (
									<img key={item._id} className="item" src={item.photo} alt={item.title} />
								)
							})
						}
					</div>
				</div>
			: <h2>Loading...</h2>}
		
		</>
	);
};

export default Profile;