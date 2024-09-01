import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    const token = localStorage.getItem("token");

    return (
        <>
            <div className="navbar">
                <h1 id="web_name">
                    Zenhance
                </h1>
                <div >
                    <Link to={"/my-space"}>My Space</Link>
                </div>
                <div>
                    <Link to={"/"}>About Us</Link>
                </div>
                <div>
                    <Link to={"/"}>Contact Us</Link>
                </div>

                
                <button>
                    {token ? (
                        <Link to={"/profile"}>Profile</Link>
                    ) : (
                        <Link to={"/signup"}>Signup</Link>
                    )}
                </button>
            </div>
        </>
    )
}
export default Navbar;