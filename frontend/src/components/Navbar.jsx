import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Context } from "../context/ContextProvider";
import { LocationIcon } from "./Icons";

export default function Navbar() {
  const { showNavBar, userID, setuserID, city } = useContext(Context);
  const [showMenu, setshowMenu] = useState(false);
  const [cookies, setCookies] = useCookies(["token"]);

  const navigate = useNavigate();
  const Logout = () => {
    setCookies("token", "");
    setuserID(null);
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <div className={`${showNavBar ? "" : "hidden"}`}>
      <div className="bg-white w-full h-[80px] flex items-center px-5 justify-between fixed border border-b-2 z-10">
        <div className="flex gap-5">
          <Link to="/" className="text-lg font-bold">
            Helpify
          </Link>

          {city && (
            <div className="bg-gray-100 rounded-full pl-2 py-1 flex items-center">
              <div className="bg-blue-700 rounded-full p-1">
                <LocationIcon size="h-4 w-4" color="text-white" />
              </div>
              <p className="font-medium text-sm mx-3">{city}</p>
            </div>
          )}
        </div>

        <div className="md:flex items-center gap-3 bg-gray-100 rounded-full p-2 hidden">
          {userID ? (
            <>
              <NavLink to="/" className="navLink">
                Home
              </NavLink>
              <NavLink to="/profile" className="navLink">
                My Profile
              </NavLink>
              
              <NavLink to="/about" className="navLink">
                About Us
              </NavLink>
              <NavLink to="/contact" className="navLink">
                Contact Us
              </NavLink>
              <button
                onClick={Logout}
                className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-1.5 px-5 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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
            {userID ? (
              <>
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  to="/profile"
                  imgSrc="/user.svg"
                  label="My Profile"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  to="/"
                  imgSrc="/home.svg"
                  label="Home"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  to="/contact"
                  imgSrc="/contact.svg"
                  label="Contact Us"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  to="/about"
                  imgSrc="/about.svg"
                  label="About Us"
                />
                <button
                  onClick={Logout}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-1.5 rounded-full text-sm truncate"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  to="/"
                  imgSrc="/home.svg"
                  label="Home"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  to="/register"
                  imgSrc="/register.svg"
                  label="Register"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  to="/login"
                  imgSrc="/login.svg"
                  label="Login"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  to="/contact"
                  imgSrc="/contact.svg"
                  label="Contact Us"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  to="/about"
                  imgSrc="/about.svg"
                  label="About Us"
                />
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
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
