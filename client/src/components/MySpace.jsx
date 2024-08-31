import { useState, useEffect } from "react";

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
            const response = await fetch('http://localhost:3000/todo', {
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
                            {postDatas.map((post, index) => (
                                <div key={index} className="box">
                                    <h3>{post.title}</h3>
                                    <p>{post.description}</p>
                                </div>
                            ))}
                            
                        </div>
                    ) : (
                        <h2>Add Tasks!</h2>
                    )}            
                </>
        )}
        </div> 
        </>
    )
}

export default MySpace;