import React from "react";
import { assets } from "../../assets/assets";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div
      className="bottom-0 footer px-10 md:px-22 lg:px-40 py-10 bg-[#034620] text-[#f2dfcf] flex flex-col items-center justify-center gap-5  md:py-20 mt-40"
      id="footer"
    >
      <div className="footer-content flex flex-col gap-8 items-center w-full lg:grid lg:grid-cols-3 lg:gap-10 max-w-screen-2xl">
        <div className="footer-content-left flex flex-col items-start gap-8">
          <img src={assets.bitezCremePng} alt="" className="w-24 md:w-50" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
            recusandae! Quae natus qui provident molestias consequuntur aut
            quasi sunt aliquid ratione. Atque nihil aperiam est blanditiis
            deleniti suscipit quia eius!
          </p>
          <div className="footer-social-icons flex justify-center gap-4 cursor-pointer">
            <FaFacebook className="text-4xl"  />
            <FaTwitter  className="text-4xl"/>
            <FaLinkedin className="text-4xl" />
          </div>
        </div>
        <div className="footer-content-center w-full flex flex-col items-start lg:items-center">
          <h2 className="text-2xl font-bold mb-4">COMPANY</h2>
          <ul>
            <li className="mb-2">Home</li>
            <li className="mb-3">About Us</li>
            <li className="mb-3">Delivery</li>
            <li className="mb-3">Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right w-full flex flex-col items-start lg:items-center">
          <h2 className="text-2xl font-bold mb-4">GET IN TOUCH</h2>
          <ul>
            <li className="mb-2">+1 238-464-0393</li>
            <li className="mb-2">contact@bitez.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full my-6" />
      <p className="footer-copy-right">
        {" "}
        Copyright {new Date().getFullYear()} &copy; Bitez.com - All Rights
        Reserved.
      </p>
    </div>
  );
}

export default Footer;
