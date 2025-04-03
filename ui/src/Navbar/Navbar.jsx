
import React, { useState } from 'react';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('session_id');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('session_id');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className='logo'>Inventory</div>

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
      </nav>
    </>
  )
}

export default Navbar;