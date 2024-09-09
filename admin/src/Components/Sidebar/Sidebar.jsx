import { NavLink } from "react-router-dom";
import { assets } from "../../assets/admin_assets/assets.js";

function Sidebar() {
  return (
    <div className="w-80 min-h-screen border border-black border-t-0 border-l-0 border-b-0">
      <div className="py-10 pl-4 flex flex-col gap-8">
        <NavLink
          to={"/add"}
          className={({ isActive }) =>
            `flex items-center gap-4 border border-black border-r-0 rounded-md p-6 cursor-pointer ${
              isActive ? "border-red-200 bg-red-200" : ""
            }`
          }
        >
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className={({ isActive }) =>
            `flex items-center gap-4 border border-black border-r-0 rounded-md p-6 cursor-pointer ${
              isActive ? "border-red-200 bg-red-200" : ""
            }`
          }
        >
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className={({ isActive }) =>
            `flex items-center gap-4 border border-black border-r-0 rounded-md p-6 cursor-pointer ${
              isActive ? "border-red-200 bg-red-200" : ""
            }`
          }
        >
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
