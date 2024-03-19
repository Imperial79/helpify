import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-white w-full h-[80px] flex items-center px-5 justify-between fixed border border-b-2">
      <Link to="/" className="text-lg font-medium">
        Logo
      </Link>
      <div className="flex items-center gap-3 bg-gray-100 rounded-full p-2">
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
    </div>
  );
}
