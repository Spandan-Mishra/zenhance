import { Link } from 'react-router-dom';
import './Navbar.css'

//import "./Navbar.css";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div id='home_id'>
                <Link to={"/"} id='photu'>Home</Link>
            </div>
            <div id='store_id'>
                <Link to={"/store"} >Store</Link>
            </div>
            <div id='space_id'>
                <Link to={"/my-space"} >My Space</Link>
            </div> 
        </div>
    )
}

export default Navbar;