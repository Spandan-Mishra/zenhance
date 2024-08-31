const Home = () => {
    return (
        <>
           <div className="signup-container">
                <h2>Sign Up</h2>
                <form action="/submit-signup" method="post">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit">Sign Up</button>
                </form>
           </div>
        </>
    )
}

export default Home;