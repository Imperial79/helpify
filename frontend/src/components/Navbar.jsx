import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Navbar() {
  const [showMenu, setshowMenu] = useState(false);
<<<<<<< HEAD
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const Logout = () => {
    setCookies("token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };
=======

  const handleMenuBtnClick = () => {
    setshowMenu(false);
  };

>>>>>>> 3002d445cd9dc7e3bf886402250e90f7ef7ff950
  return (
    <div className="bg-white w-full h-[80px] flex items-center px-5 justify-between fixed border border-b-2">
      <Link to="/" className="text-lg font-medium">
        Logo
      </Link>
      <div className="md:flex items-center gap-3 bg-gray-100 rounded-full p-2 hidden">
<<<<<<< HEAD
        {cookies.token ? (
          <>
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
=======
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
>>>>>>> 3002d445cd9dc7e3bf886402250e90f7ef7ff950
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
<<<<<<< HEAD
          {cookies.token ? (
            <>
              <Link to="/profile" className="menuBtn">
                <img src="/home.svg" alt="profile" className="h-6 w-6" />
                <p>My Profile</p>
              </Link>
              <button
                onClick={Logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
=======
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
>>>>>>> 3002d445cd9dc7e3bf886402250e90f7ef7ff950
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
