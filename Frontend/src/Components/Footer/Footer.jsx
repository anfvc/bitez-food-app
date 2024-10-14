import React from 'react'
import { assets } from '../../assets/assets'

function Footer() {
  return (
    <div className="footer px-20 bg-[#323232] text-[#d9d9d9] flex flex-col items-center justify-center gap-5 md:px-40 py-20 mt-40" id="footer">
      <div className='footer-content flex flex-col gap-8 items-center w-full lg:grid lg:grid-cols-3 lg:gap-10'>
        <div className='footer-content-left flex flex-col items-start gap-8'>
          <img src={assets.logo} alt="" className='w-44' />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, recusandae! Quae natus qui provident molestias consequuntur aut quasi sunt aliquid ratione. Atque nihil aperiam est blanditiis deleniti suscipit quia eius!</p>
          <div className='footer-social-icons flex justify-center gap-4 cursor-pointer'>
            <img src={assets.facebook_icon} alt="" className='w-14' /><img src={assets.twitter_icon} alt="" className='w-14' /><img src={assets.linkedin_icon} alt="" className='w-14' />
          </div>
        </div>
        <div className='footer-content-center flex flex-col items-center'>
          <h2 className='text-2xl font-bold text-white mb-4'>COMPANY</h2>
          <ul>
            <li className='mb-2'>Home</li>
            <li className='mb-3'>About Us</li>
            <li className='mb-3'>Delivery</li>
            <li className='mb-3'>Privacy Policy</li>
          </ul>
        </div>
        <div className='footer-content-right flex flex-col items-center'>
          <h2 className='text-2xl font-bold mb-4'>GET IN TOUCH</h2>
          <ul>
            <li className='mb-2'>+1 238-464-0393</li>
            <li className='mb-2'>contact@bitez.com</li>
          </ul>
        </div>
      </div>
      <hr className='w-full my-6' />
      <p className="footer-copy-right"> Copyright {new Date().getFullYear()} &copy; Bitez.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
