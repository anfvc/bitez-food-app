import React from "react";
import { assets } from "../../assets/assets";

function AppDownload() {
  return (
    <div
      className="w-full app-download m-auto text-center text-3xl mt-40 font-semibold"
      id="app-download"
    >
      <p>
        For a better experience, download our app! <br />
        Bitez App
      </p>
      <div className="w-full app-download-platforms flex flex-col items-center gap-4 md:flex-row md:gap-5 md:justify-center mt-10">
        <img
          src={assets.play_store}
          alt=""
          className="w-6/12 sm:max-w-40 cursor-pointer duration-500 hover:scale-90"
        />
        <img
          src={assets.app_store}
          alt=""
          className="w-6/12 sm:max-w-40 cursor-pointer duration-500 hover:scale-90"
        />
      </div>
    </div>
  );
}

export default AppDownload;
