import React from 'react'

function Header() {
  return (
    <div className="header h-38vw  lg:h-34vw my-12 mx-auto bg-backgroundImage bg-no-repeat bg-contain max-w-1/2 relative">
      <div className="header-content max-w-18 gap-1 left-4 bottom-8 sm:bottom-16 sm:left-10 md:bottom-20 md:gap-4 absolute flex flex-col items-start md:left-8 lg:gap-6 lg:max-w-3xl lg:bottom-28 lg:left-20">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl text-white lg:text-7xl">Order your favourite food here!</h2>
        <p className='hidden text-white lg:block lg:text-xl'>Savor a diverse menu offering an exquisite selection of dishes, expertly crafted with the finest ingredients and culinary mastery.</p>
        <button className="border-0 text-md px-3 py-1 font-bold text-gray-950 md:px-6 md:py-3 bg-white md:text-xl rounded-3xl">View Menu</button>
      </div>

    </div>
  )
}

export default Header
