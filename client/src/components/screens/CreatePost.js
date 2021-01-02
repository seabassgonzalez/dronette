import React, {useState} from 'react';

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [image, setImage] = useState("");
	const [url, setUrl] = useState(""); 

	const postDetails = () => {
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
			console.log(data);
		})
		.catch(err=>{
			console.log(err);
		});
	};

   	return (
		<div className="card input-field"
			style={{
				margin: "30px auto",
				maxWidth: "500px",
				padding: "20px",
				textAlign: "center"
			}}
		>
			<input 
				type="text" 
				placeholder="title" 
				value={title}
				onChange={(e)=>setTitle(e.target.value)}
			/>
			<input 
				type="text" 
				placeholder="body" 
				value={body}
				onChange={(e)=>setBody(e.target.value)}
			/>
			<div className="file-field input-field">
				<div className="btn purple lighten-2">
					<span>Upload Image</span>
					<input type="file" onChange={(e)=>setImage(e.target.files[0])} />
				</div>
				<div className="file-path-wrapper">
					<input className="file-path validate" type="text" />
				</div>
			</div>
			<button className="btn waves-effect waves-light #9b59b6 purple lighten-2"
				onClick={()=>postDetails()}
			>
				Submit Post
			</button>
		</div>
	);
};

export default CreatePost;