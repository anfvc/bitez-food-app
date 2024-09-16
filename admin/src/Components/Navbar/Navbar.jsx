import { assets } from "../../assets/admin_assets/assets.js";

function Navbar() {
  return (
    <div className="w-full flex justify-between items-center p-8 border border-black border-r-0 border-l-0 border-t-0">
      <div className="w-full font-semibold flex flex-col gap-4">
        <img src={assets.adminLogo} alt="" className="logo w-32 " />
        <h1 className="flex text-4xl">Admin Panel</h1>
      </div>
      <div>
        <img src={assets.profile_image} alt="" className="w-32" />
      </div>
    </div>
  );
}

export default Navbar;
