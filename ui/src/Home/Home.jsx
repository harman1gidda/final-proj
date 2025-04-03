import "./home.css";

export default function Home() {

    const username = localStorage.getItem('username');
    console.log(username);

    return (
        <>
            <h3> Home Page </h3>
                <div className='NavContainer'>
                    <div className='NavBar'>
                        <div className='button'>
                            <a href="/item" className="iconLink">
                                <button className='iconButton'>All Items</button>
                            </a>
                        </div>
                    </div>

                <div className='userStatus'>
                    {username ? (
                    <p>Welcome, {username}!</p>
                    ) : (
                    <p>Guest</p>  // Display Guest if no one is logged in
                    )}
                </div>
            </div>
        </>
    )
}