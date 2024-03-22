import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setshowMenu] = useState(false);

  const handleMenuBtnClick = () => {
    setshowMenu(false);
  };

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
        <NavLink to="/profile" className="navLink">
          Username
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
          <Link
            onClick={handleMenuBtnClick}
            to={"/profile"}
            className="menuBtn"
          >
            <div className="h-[20px] w-[20px] overflow-hidden rounded-full">
              <img
                src={
                  "https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                }
                alt={"User"}
                className="h-full w-full object-cover"
              />
            </div>
            <p>{"Username"}</p>
          </Link>
          <HomeMenuLink
            onClick={handleMenuBtnClick}
            to="/"
            label="Home"
            imgSrc="/home.svg"
          />
          <HomeMenuLink
            onClick={handleMenuBtnClick}
            to="/register"
            label="Register"
            imgSrc="/register.svg"
          />
          <HomeMenuLink
            onClick={handleMenuBtnClick}
            to="/login"
            label="Login"
            imgSrc="/user.svg"
          />
          <HomeMenuLink
            onClick={handleMenuBtnClick}
            to="/contact"
            label="Contact Us"
            imgSrc="/contact.svg"
          />
          <HomeMenuLink
            onClick={handleMenuBtnClick}
            to="/about"
            label="About Us"
            imgSrc="/about.svg"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function HomeMenuLink({ onClick, to, imgSrc, label }) {
  return (
    <Link onClick={onClick} to={to} className="menuBtn">
      <img src={imgSrc} alt={label} className="h-[20px] w-[20px]" />
      <p className="text-[15px] tracking-wide">{label}</p>
    </Link>
  );
}
