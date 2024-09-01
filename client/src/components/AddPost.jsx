import { useState } from "react";
import PropTypes from 'prop-types';
import "../App.css"

const AddPost = ({ onAddPost }) => {
    const [post, setPost] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token) {
            console.log("Login required!");
            return ;
        }
        try {
            const response = await fetch('http://localhost:3000/my-space', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    post: post
                })
            });

            if(!response.ok) {
                console.log("Authorization failed");
                return ;
            }

            onAddPost();
            setPost('');
        } catch(error) {
            console.log(error.message);
        }

    }

    return (
        <form className="form_box" onSubmit={handleSubmit}>
            <h2 >Add Tasks here!</h2>
            <div className="form">
                <input 
                    type="text" 
                    placeholder="Submit a post"
                    value={post}
                    onChange={(e) => {
                        setPost(e.target.value)
                        }}/>
                <button type="submit">Post!</button> 
            </div> 

        </form>
    )
}

AddPost.propTypes = {
    onAddPost: PropTypes.func.isRequired,
};

export default AddPost;