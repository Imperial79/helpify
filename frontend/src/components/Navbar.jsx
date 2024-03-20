import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setshowMenu] = useState(false);
  return (
    <div className="bg-white w-full h-[80px] flex items-center px-5 justify-between fixed border border-b-2">
      <Link to="/" className="text-lg font-medium">
        Logo
      </Link>
      <div className="md:flex items-center gap-3 bg-gray-100 rounded-full p-2 hidden">
        <NavLink to="/" className="navLink">
          Home
        </NavLink>
        <NavLink to="/register" className="navLink">
          Register
        </NavLink>
        <NavLink to="/login" className="navLink">
          Login
        </NavLink>
        <NavLink to="/contact" className="navLink">
          Contact Us
        </NavLink>
        <NavLink to="/about" className="navLink">
          About Us
        </NavLink>
      </div>

      <button
        className="block md:hidden"
        onClick={() => {
          setshowMenu(!showMenu);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {showMenu ? (
        <div className="menu">
          <Link to="/" className="menuBtn">
            <img src="/home.svg" alt="home" className="h-6 w-6" />
            <p>Home</p>
          </Link>
          <Link to="/register" className="menuBtn">
            <img src="/register.svg" alt="register" className="h-6 w-6" />
            <p>Register</p>
          </Link>
          <Link to="/login" className="menuBtn">
            <img src="/user.svg" alt="login" className="h-6 w-6" />
            <p>Login</p>
          </Link>
          <Link to="/contact" className="menuBtn">
            <img src="/contact.svg" alt="contact" className="h-6 w-6" />
            <p>Contact Us</p>
          </Link>
          <Link to="/about" className="menuBtn">
            <img src="/about.svg" alt="about" className="h-6 w-6" />
            <p>About Us</p>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
