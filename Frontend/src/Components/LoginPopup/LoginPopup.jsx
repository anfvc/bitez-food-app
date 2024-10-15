import React, { useState } from "react";
import { assets } from "../../assets/assets";

function LoginPopup({ setShowLogin }) {
  const [currentState, setCurrentState] = useState("Sign Up");

  return (
    <div className="login-popup absolute z-10 w-full h-full grid bg-[#00000090]">
      <form className="login-popup-container place-self-center py-16 px-10 w-3/12 rounded-xl min-w-60 max-w-xl bg-white flex flex-col gap-8 ">
        <div className="login-popup-title flex justify-between">
          <h2 className="text-3xl font-semibold">{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
            className="cursor-pointer w-8"
          />
        </div>
        <div className="login-popup-input flex flex-col gap-6">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your name"
              required
              className="border border-gray-500 p-2 rounded-xl"
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            className="border border-gray-500 p-2 rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="border border-gray-500 p-2 rounded-xl"
          />
        </div>
        <button className="border border-gray-500 p-2 rounded-xl text-xl font-semibold bg-[#034620] text-white">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition flex items-start gap-3">
          <input type="checkbox" required className="w-5 mt-1" />
          <p>By continuing, you agree to the terms of use and privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p className="text-center">
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")} className="font-bold text-[#034620] hover:cursor-pointer">Click here</span>
          </p>
        ) : (
          <p className="text-center">
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")} className="font-bold text-[#034620] hover:cursor-pointer">Login here</span>{" "}
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
