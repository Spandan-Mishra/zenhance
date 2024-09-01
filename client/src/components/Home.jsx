import work from '../assets/work.jpg'
const Home = () => {
    return (
        <>
            <div className="main_heading">
                Managing Your Tasks <br />
                And Productivity <br />
                Becomes Easier.
            </div>

            <div className="below_heading">
                Effortlessly organize , priotrize and track your tasks,helping you <br />
                achieve new heights in productivity and sucess. Join us on a <br />
                journew to conquer you to-do list.
            </div>

            <div>
                <button 
                    className='change_colour'
                    onClick={() => { window.location.href = '/signup' }}>
                        Signup for free!
                </button>
            </div>
            <div className="main_inside_container">
                <img src={work} alt="image" />
            </div>
            <div className="top_single_div">
                <span>350%</span> <br />
                <p>Average anual growth rate</p>
            </div>
            <div className="bottom_left_div">
                <span>95%</span> <br />
                <p>Increase in efficiency</p>
            </div>
            {/* <div className="bottom_right_div"></div> */}
            
        </>
    )
}

export default Home;