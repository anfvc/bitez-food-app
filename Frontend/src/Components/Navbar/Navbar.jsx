import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("Home");

  const { calculateTotalInCart, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className="navbar py-6 flex justify-between items-center p-4">
      <Link to="/">
        <img
          src={assets.bitezLogo}
          alt=""
          className="logo w-20 md:w-36 lg:w-34"
        />
      </Link>
      <ul className="navbar-menu hidden text-xl font-medium md:flex list-none gap-8">
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
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" className="w-6 sm:w-8" />
          </Link>
          {/* If the sum is 0, do not show the the dot in the cart icon, if sum is > 0, show it */}
          <div
            className={`${calculateTotalInCart() === 0 ? "" : "dot absolute min-w-3 min-h-3 bg-[#034620] rounded-lg -top-2.5 -right-1.5"}`}
          ></div>
        </div>
        {!token ? (
          <button
            className="border py-1 px-2 bg-[#034620] lg:px-4 rounded-xl hover:bg-[#e66312] text-white transition duration-300"
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </button>
        ) : (
          <div className="navbar-profile relative group cursor-pointer">
            <img src={assets.profile_icon} alt="" />
            <ul className="navprofile-dropdown absolute hidden right-0 z-10 group-hover:flex flex-col mt-2 bg-white py-6 px-10 gap-2 border border-[#034620] outline-[#034620]">
              <li className="flex justify-center items-center gap-2 my-1 cursor-pointer">
                <img src={assets.bag_icon} alt="" />
                <p className="hover:text-[#034620]">Orders</p>
              </li>
              <hr />
              <li
                className="flex justify-center my-1 cursor-pointer gap-2"
                onClick={handleLogout}
              >
                <img src={assets.logout_icon} alt="" />
                <p className="hover:text-[#034620]">Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
