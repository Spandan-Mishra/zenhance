import image from '../assets/meditation.jpg'
import image2 from '../assets/yoga.jpg'
const Home = () => {
    return (
        <>
            <div className="top_main_container_curved">
                <h1>
                    Zenhance
                </h1>

                <p>
                    Small deeds done are better than great deeds planned. <br />
                    <span>-Peter Marshall</span>
                </p>
            </div>

            <h2 id="featuer_name">
                Features
            </h2>

            <div className="feature_div">
                <div className="medition_div">
                    <img src={image} alt="image" id='image_meditation'/>
                    <h2>Meditation</h2>
                    <p>You have power over your mind</p>
                </div>
                <div className="yoga_div">
                    <img src={image2} alt="yoga_Image" id='image_meditation'/>
                    <h2></h2>
                    <p></p>
                </div>
                <div className="journalism_div">
                    <h2></h2>
                    <p></p>
                </div>
            </div>
            
            

            <div className="about_section">
                <h1>About Us</h1>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem aliquam laboriosam reiciendis quis nam velit possimus tempore dicta officiis perferendis! Aut sed non ipsam explicabo, blanditiis nesciunt alias neque laudantium?
                </p>
            </div>

            <button className="button">
                Get Started
            </button>
        </>
    )
}

export default Home;