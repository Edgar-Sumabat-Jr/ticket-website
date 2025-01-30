// Header.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Modal from './Modal';
import LoginPage from '../pages/LoginPage';
import Register from './Register'; // Import Register

const Header = () => {
    const { user, logoutUser  } = useContext(AuthContext);
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false); // State to toggle between login and register

    const toggleMobileMenu = () => {
        setIsMobileMenuActive(!isMobileMenuActive);
    };

    const openModal = (isRegisterForm) => {
        setIsRegister(isRegisterForm);
        setIsModalOpen(true);
    };

    return (
        <div className="navbar-container">
            <div className="navbar-logo font-bold">
                <h1>
                    <span className="text-white">logo</span>
                    <span className="bg-white-500 text-black p-2 rounded">here</span>
                </h1>
            </div>

            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
                {isMobileMenuActive ? 'X' : '☰'}
            </div>

            <div className={`navbar-links ${isMobileMenuActive ? 'active' : ''}`}>
                <ul className="navbar-links">
                    <li>
                        <Link to="/" className="nav-button">Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <button onClick={logoutUser } className="nav-button">Logout</button>
                            </li>
                            <li>
                                <p className="nav-button">Hello {user.username}!</p>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <button onClick={() => openModal(false)} className="nav-button">Login</button>
                            </li>
                            <li>
                                <button onClick={() => openModal(true)} className="nav-button">Register</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Modal for Login/Register */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {isRegister ? (
                    <Register onClose={() => setIsModalOpen(false)} />
                ) : (
                    <LoginPage onClose={() => setIsModalOpen(false)} openRegister={() => openModal(true)} />
                )}
            </Modal>
        </div>
    );
};

export default Header;