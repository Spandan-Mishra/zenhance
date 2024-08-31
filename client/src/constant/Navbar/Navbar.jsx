import { Link } from 'react-router-dom';

//import "./Navbar.css";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div>
                <Link to={"/home"} >Home</Link>
            </div>
            <div>
                <Link to={"/store"} >Store</Link>
            </div>
            <div>
                <Link to={"/my-space"} >My Space</Link>
            </div> 
        </div>
    )
}

export default Navbar;