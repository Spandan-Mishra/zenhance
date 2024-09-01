import { useState, useEffect } from "react";
import AddPost from "./AddPost";

const MySpace = () => {
    const [postDatas, setPostDatas] = useState([]);
    const [error, setError] = useState("");
    
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        if(!token) {
            setError("Login required!");
            return ;
        }
        try {
            const response = await fetch('http://localhost:3000/my-space', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });

            if(!response.ok) {
                setError("Authorization failed");
                return ;
            }

            const json = await response.json();
            setPostDatas(json);
        } catch(error) {
            setError(error.message);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
           <div className="center">
            {error ? (
                <h2>{error}</h2>
            ) : (
                <>
                    <h1>Welcome to your Space!</h1>
                    {postDatas.length !== 0  ? (
                        <div>
                            {console.log(postDatas)}
                            {postDatas.map((user, userIndex) => (
                                user.posts.map((post, postIndex) => (
                                    <div key={`${userIndex}-${postIndex}`}>
                                        <h2>{user.username}</h2>
                                        <h3>{post.content}</h3>
                                    </div>
                                ))
                            ))}
                            
                        </div>
                    ) : (
                        <h2>Add Tasks!</h2>
                    )}   
                    <AddPost onAddPost={fetchData} />
                </>
        )}
        </div> 
        </>
    )
}

export default MySpace;