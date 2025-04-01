
import React, { useState } from 'react';
import './Navbar.css'
import {useNavigate} from 'react-router-dom';
import Hamburger from "hamburger-react"

function Navbar(){
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false)

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>

        <nav className="navbar">
          <h4 className='navHeader'>Inventory</h4>

          {isOpen && (
          <ul>
            <li><button className="navbar-btn" onClick={() => handleNavigation('/')}>Home</button></li>
            <li><button className="navbar-btn" onClick={() => handleNavigation('/item')}>All Items</button></li>
            <li><button className="navbar-btn" onClick={() => handleNavigation('/signup')}>Sign Up</button></li>
            <li><button className="navbar-btn" onClick={() => handleNavigation('/login')}>Log In</button></li>
          </ul>
          )}
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </nav>
    </>
  )
}

export default Navbar;