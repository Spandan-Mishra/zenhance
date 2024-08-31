import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <h1 id="web_name">
                    Zenhance
                </h1>
                <div className="home">
                    <Link to={"/home"}>Home</Link>
                </div>

                <div className="aboutus">
                    <Link to={"/aboutus"}>About Us</Link>
                </div>

                <div className="services">
                    <Link to={"/services"}>Services</Link>
                </div>

                <div className="contact">
                    <Link to={"/contact"}>Contact</Link>
                </div>

                <button>
                    Get Started <span id="arrow">➜</span>
                </button>
            </div>
        </>
        // <div className='navbar'>
        //     <div id='home_id'>
        //         <Link to={"/"} id='photu'>Home</Link>
        //     </div>
        //     <div id='space_id'>
        //         <Link to={"/my-space"} >My Space</Link>
        //     </div> 
        // </div>
    )
}
export default Navbar;