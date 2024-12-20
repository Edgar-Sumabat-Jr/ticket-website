import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


const Navbar = ({ setIsFormVisible, setIsLogin }) => {
  const [nav, setNav] = useState(false); // State to toggle the sidebar

  const handleNav = () => {
    setNav(!nav); // Toggle sidebar state
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-black">
      {/* Logo */}
      <h1 className="inline-block font-bold text-3xl ml-2">
        <span className="text-white">logo</span>
        <span className="bg-white-500 text-black p-2 rounded">here</span>
      </h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex">
        <li
          className="p-5 cursor-pointer"
          onClick={() => {
            setIsFormVisible(true);
            setIsLogin(true);
          }}
        >
          Login
        </li>
        <li
          className="p-5 cursor-pointer"
          onClick={() => {
            setIsFormVisible(true);
            setIsLogin(false);
          }}
        >
          Register
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[60%] h-full border-r border-gray-900 bg-gray-800 transition-transform duration-500 ease-in-out ${
          nav ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="uppercase p-8">
          <li
            className="p-5 border-b border-gray-600 cursor-pointer"
            onClick={() => setNav(false)}
          >
            Home
          </li>
          <li
            className="p-5 border-b border-gray-600 cursor-pointer"
            onClick={() => setNav(false)}
          >
            Movies
          </li>
          <li
            className="p-5 border-b border-gray-600 cursor-pointer"
            onClick={() => setNav(false)}
          >
            Series
          </li>
          <li
            className="p-5 border-b border-gray-600 cursor-pointer"
            onClick={() => setNav(false)}
          >
            Cartoons
          </li>
          <li
            className="p-5 border-b border-gray-600 cursor-pointer"
            onClick={() => setNav(false)}
          >
            Anime
          </li>
          <li
            className="p-5 border-b border-gray-600 cursor-pointer"
            onClick={() => setNav(false)}
          >
            Contact Us
          </li>
          <li
            className="p-5 cursor-pointer"
            onClick={() => {
              setIsFormVisible(true);
              setIsLogin(true);
              setNav(false);
            }}
          >
            Login
          </li>
          <li
            className="p-5 cursor-pointer"
            onClick={() => {
              setIsFormVisible(true);
              setIsLogin(false);
              setNav(false);
            }}
          >
            Register
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
