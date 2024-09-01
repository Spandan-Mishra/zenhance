import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <>
            <div className="navbar">
                <h1 id="web_name">
                    <Link to={"/"}><img src={logo} alt="logo" id="logo"/></Link>
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

                
                <button 
                    // className='change_colour'
                    onClick={() => { window.location.href = '/profile' }}>
                        Profile
                </button>
            </div>
        </>
    )
}
export default Navbar;