import { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("Home");

  return (
    <div className="navbar py-6 flex justify-between items-center p-4">
      <img src={assets.bitezLogo} alt="" className="logo w-20 md:w-36 lg:w-34" />
      <ul className="navbar-menu hidden lg:flex list-none gap-8">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={
            menu === "Home"
              ? "active border border-t-0 border-x-0 border-b-2 border-black hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={
            menu === "Menu"
              ? "active border border-t-0 border-x-0 border-b-2 border-black hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile App")}
          className={
            menu === "Mobile App"
              ? "active border border-t-0 border-x-0 border-b-2 border-black hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact Us")}
          className={
            menu === "Contact Us"
              ? "active border border-t-0 border-x-0 border-b-2 border-black hover:cursor-pointer"
              : "hover:cursor-pointer"
          }
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right flex items-center gap-4 md:gap-6 lg:gap-10">
        <img src={assets.search_icon} alt="" className="w-6 sm:w-8" />
        <div className="navbar-search-icon relative">
          <img src={assets.basket_icon} alt="" className="w-6 sm:w-8" />
          <div className="dot absolute min-w-3 min-h-3 bg-[#034620] rounded-lg -top-2.5 -right-1.5"></div>
        </div>
        <button
          className="border py-1 px-1 border-black lg:p-2 rounded-lg bg-transparent hover:bg-[#fff4f2] transition duration-300"
          onClick={() => setShowLogin(true)}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Navbar;
