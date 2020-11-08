import React from 'react';

const Profile = () => {
	return (
		<div>
			<div style={{
				display:"flex",
				justifyContent:"space-around",
				margin:"18px 0px",
				borderBottom:"1px solid grey"
			}}>
				<div>
					<img style={{width:"160px", height:"160px", borderRadius:"80px"}}
					src="https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/120075726_798496587650763_8285517711531601562_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=gh_prBWUMPwAX_QkJ6T&oh=df0d7bd50b6b9a6d62471ef35bc93364&oe=5FCFF6B9"
					/>
				</div>
				<div>
					<h4>Sebastian Gonzalez</h4>
					<div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
						<h6>50 posts</h6>
						<h6>50 followers</h6>
						<h6>50 following</h6>
					</div>
				</div> 
			</div>
		</div>
	);
};

export default Profile;