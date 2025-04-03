
import React, { useState } from 'react';
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom';
// import Hamburger from "hamburger-react"

function Navbar() {
  const navigate = useNavigate();
  // const [isOpen, setOpen] = useState(false)
  const isAuthenticated = localStorage.getItem('session_id');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    // Remove session data from localStorage
    localStorage.removeItem('session_id');
    localStorage.removeItem('username');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className='logo'>Inventory</div>

          {/* {isOpen && ( */}
        <ul>
          <li><button className="navbar-btn" onClick={() => navigate('/')}>Home</button></li>

          <li><button className="navbar-btn" onClick={() => navigate('/item')}>All Items</button></li>

          {!isAuthenticated ? (
            <>
              <li><button className="navbar-btn" onClick={() => navigate('/signup')}>Sign Up</button></li>
              <li><button className="navbar-btn" onClick={() => navigate('/login')}>Log In</button></li>
            </>
              ) : (
            <>
                {/* If authenticated, show username and log out button */}
                <li>
                  <span className="navbar-username">Welcome, {username}!</span>
                </li>
                <li>
                  <button className="navbar-btn" onClick={handleLogout}>Log Out</button>
                </li>
                <li>
                  <button className="navbar-btn" onClick={() => navigate('/my-items')}>My Items</button>
                </li>
            </>
            )}

        </ul>
          {/* )} */}
          {/* <Hamburger toggled={isOpen} toggle={setOpen} /> */}
      </nav>
    </>
  )
}

export default Navbar;