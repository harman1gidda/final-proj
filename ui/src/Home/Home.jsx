//import { useEffect, useState } from 'react';
import "./home.css";
import { Link } from 'react-router-dom';
// import Gears from "../assets/gears.png"
// import Conflict from "../assets/conflict.png"
// import Sites from "../assets/sites.png"

export default function Home() {

    return (
        <>
        <h3> Home Page </h3>
            <div className='NavContainer'>
                <div className='NavBar'>
                    <div className='button'>
                        <a href="/allitems" className="iconLink">
                            {/* <img src={Gears} alt="gears" /> */}
                            <button className='iconButton'>All Items</button>
                        </a>
                    </div>
                    <div className='button'>
                        <a href="/login" className="iconLink">
                            {/* <img src={Sites} alt="sites" /> */}
                            <button className='iconButton'>Log In</button>
                        </a>
                    </div>
                </div>
                <div className='SubmitBar'>
                    <div className='button' id="submitButton">
                        <button><Link to={"/submit"}>Submit New Request</Link></button>
                    </div>
                </div>
            </div>

        </>
    )
}