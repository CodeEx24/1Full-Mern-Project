
const Home = () => {
    const buttonClick = () => {
        console.log("Button is clicked");
    }

    return ( 
        <div className="home">
            <h2>Home Page</h2>
            <button onClick={buttonClick}>Click Me!</button>
        </div>
    );
}
 
export default Home;