import React from "react";
import { menu_list } from "../../assets/assets";

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="explore-menu flex flex-col gap-6 mt-20" id="explore-menu">
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-[#262626]">
        Explore our Menu
      </h1>
      <p className="explore-menu-text text-lg md:text-xl max-w-7xl">
        Explore a diverse menu offering a delectable array of dishes, carefully
        crafted to satisfy your cravings. Our mission is to elevate your dining
        experience, one exquisite meal at a time.
      </p>
      <div className="explore-menu-list flex justify-between items-center gap-6 text-center mx-2 my-0 overflow-x-scroll scrollbar-hide  transition duration-200">
        {menu_list.map((item, index) => {
          return (
            <div
              className="explore-menu-list-item  mt-4 text-[#747474] cursor-pointer"
              key={index}
              onClick={() =>
                setCategory((value) =>
                  value === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                src={item.menu_image}
                alt=""
                className={`min-w-36 w-20 cursor-pointer transition-all ${category === item.menu_name ? "border-4 border-[#034620] p-1 rounded-full" : ""}`}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr className="mt-2 h-0.5 border-0 bg-[#e2e2e2]" />
    </div>
  );
}

export default ExploreMenu;
