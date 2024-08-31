import { useEffect, useState } from "react";

import "../App.css";

const MySpace = () => {
    const [task, setTasks] = useState([]);
    const [journal, setJournal] = useState([]);
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
            setTasks(json.tasks);
            setJournal(json.journal);
        } catch(error) {
            setError(error.message);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    return (
       <>
        <Tasks />
        <div className="center">

        </div>
        
       </> 
    )
}

export default MySpace;