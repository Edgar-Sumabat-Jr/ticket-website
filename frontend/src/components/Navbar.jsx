import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <div className="navbar-container">
      {/* Logo */}
      <div className="navbar-logo font-bold">
        <h1>
          <span className="text-white">logo</span>
          <span className="bg-white-500 text-black p-2 rounded">here</span>
        </h1>
      </div>

      {/* Mobile Menu Icon */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {/* Add a simple icon or text for the mobile menu */}
        {isMobileMenuActive ? 'X' : '☰'}
      </div>

      {/* Navbar Links */}
      <div className={`navbar-links ${isMobileMenuActive ? 'active' : ''}`}>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="nav-button">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <button onClick={logoutUser} className="nav-button">Logout</button>
              </li>
              <li>
                <p className="nav-button">Hello {user.username}!</p>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-button">Login</Link>
              </li>
              <li>
                <Link to="/register" className="nav-button">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
