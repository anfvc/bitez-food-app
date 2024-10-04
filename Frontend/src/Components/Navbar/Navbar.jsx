import { assets } from "../../assets/assets";

function Navbar() {
  return (
    <div className="navbar p-2 flex justify-between items-center">
      <img src={assets.logo} alt="" className="logo w-50" />
      <ul className="navbar-menu flex list-none gap-8 font">
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div></div>
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
