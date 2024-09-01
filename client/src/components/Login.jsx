import { useState } from "react";

const Login = () => {
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
                    id="input1"
                />    
                <input 
                    type="text" 
                    placeholder="Enter password" 
                    name="password" 
                    onChange={(e) => {setPassword(e.target.value)}} 
                    id="input2"
                />
                <select
                    onChange={(e) => {setCollege(e.target.value)}}
                    defaultValue={"college"}
                >
                    <option value="college" disabled >Select college</option>
                    <option value="NITR">NITR</option>
                    <option value="IITB">IITB</option>
                    <option value="NITK">NITK</option>
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
                        localStorage.setItem("username", username);
                    }}
                >
                    Login
                </button>
            </div>
        </div>
        
    )
}

export default Login;