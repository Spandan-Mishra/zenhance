import cover from '../assets/cover.jpg';
import main_dp from '../assets/main_dp.jpg';
import verified from '../assets/verified.png'
const Profile = () => {
    return (
        <>
            <div className="left_side_panel">
                <div className="profile_info">Profile</div>
                <div className="my_tasks">My Tasks</div>
            </div>
            <div className="right_side_panel">
                <div className="cover_photo"><img src={cover} alt="cover_photo" className="cover_photo"/></div>
                <img src={main_dp} alt="main_dp" className="main_dp"/>
            </div>

            <h1 className="name_person">Andrew Match</h1>
            <img src={verified} alt="verified_symbol" className="verified"/>
            <p className="paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
             Animi  vero <br /> est nisi minima suscipit, excepturi ipsa ratione accusantium commodi <br />
             id beatae sed tenetur minus sint quam assumenda rerum aut voluptates.</p>
        </>
    )
}

export default Profile;