import { NavLink } from "react-router-dom";
import { assets } from "../../assets/admin_assets/assets.js";

function Sidebar() {
  return (
    <div className="w-80 min-w-fit sm:min-w-80 min-h-screen border border-black border-t-0 border-l-0 border-b-0">
      <div className="py-10 pl-4 flex flex-col gap-8">
        <NavLink
          to={"/add"}
          className={({ isActive }) =>
            `justify-start sm:flex sm:items-center gap-4 border border-black border-r-0 rounded-md p-6 cursor-pointer ${
              isActive ? "border-red-500 bg-red-200" : ""
            }`
          }
        >
          <img src={assets.add_icon} alt="" className="flex self-end" />
          <p className="hidden sm:flex">Add Items</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className={({ isActive }) =>
            `justify-start sm:flex sm:items-center gap-4 border border-black border-r-0 rounded-md p-6 cursor-pointer ${
              isActive ? "border-red-500 bg-red-200" : ""
            }`
          }
        >
          <img src={assets.order_icon} alt="" className="flex self-end" />
          <p className="hidden sm:flex">List Items</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className={({ isActive }) =>
            `justify-start sm:flex sm:items-center gap-4 border border-black border-r-0 rounded-md p-6 cursor-pointer ${
              isActive ? "border-red-500 bg-red-200" : ""
            }`
          }
        >
          <img src={assets.order_icon} alt="" className="flex self-end" />
          <p className="hidden sm:flex">Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
