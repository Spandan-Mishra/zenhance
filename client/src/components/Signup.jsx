import { useState } from "react";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [college, setCollege] = useState("");

    return (
        <div className="box">
            <h1>Login</h1>
            <div className="form">
                <input 
                    type="text" 
                    placeholder="Enter username" 
                    name="username" 
                    onChange={(e) => {setUsername(e.target.value)}} 
                />    
                <input 
                    type="text" 
                    placeholder="Enter password" 
                    name="password" 
                    onChange={(e) => {setPassword(e.target.value)}} 
                />
                <select
                    onChange={(e) => {setCollege(e.target.value)}}
                >
                    <option value="college" disabled selected>Select college</option>
                    <option value="college1">NITR</option>
                    <option value="college2">IITB</option>
                    <option value="college3">NITK</option>
                </select>
                <button 
                    type="submit"
                    id="submit"
                    onClick={async () => {
                        const response = await fetch('http://localhost:3000/login', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                username: username,
                                password: password,
                                college: college
                            }),
                        });
                        
                        const json = await response.json();
                        if(response.ok) {
                            console.log(json.client);
                            localStorage.setItem("token", json.token);
                        } else {
                            console.log(json);
                        }
                        
                    }}
                >
                    Signup
                </button>
            </div>
        </div>
        
    )
}

export default Signup;