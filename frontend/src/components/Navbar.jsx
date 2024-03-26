import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Context } from "../context/ContextProvider";

export default function Navbar() {
  const { showNavBar } = useContext(Context);
  const [showMenu, setshowMenu] = useState(false);
  const [cookies, setCookies] = useCookies(["token"]);

  const navigate = useNavigate();
  const Logout = () => {
    setCookies("token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <div className={`${showNavBar ? "" : "hidden"}`}>
      <div className="bg-white w-full h-[80px] flex items-center px-5 justify-between fixed border border-b-2 z-10">
        <Link to="/" className="text-lg font-medium">
          Logo
        </Link>
        <div className="md:flex items-center gap-3 bg-gray-100 rounded-full p-2 hidden">
          {cookies.token ? (
            <>
              <NavLink to="/" className="navLink">
                Home
              </NavLink>
              <NavLink to="/profile" className="navLink">
                My Profile
              </NavLink>
              <button
                onClick={Logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
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
            {cookies.token ? (
              <>
                <Link to="/profile" className="menuBtn">
                  <img src="/home.svg" alt="profile" className="h-6 w-6" />
                  <p>My Profile</p>
                </Link>
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  imgSrc="/home.svg"
                  label="Home"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  imgSrc="/contact.svg"
                  label="Contact Us"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  imgSrc="/about.svg"
                  label="About Us"
                />
                <button
                  onClick={Logout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
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
                  imgSrc="/register.svg"
                  label="Register"
                />
                <HomeMenuLink
                  onClick={() => {
                    setshowMenu(false);
                  }}
                  imgSrc="/home.svg"
                  label="Home"
                />
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
