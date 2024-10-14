import React from 'react'

function Header() {
  return (
    <div className="header w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] xl:h-[80vh] mx-auto bg-backgroundImage bg-no-repeat bg-cover bg-center  relative max-h-[700px]">
      <div className="header-content gap-8 left-12 bottom-28 lg:w-6/12 absolute flex flex-col items-start ">
        <h2 className="font-semibold text-4xl sm:text-5xl md:text-6xl text-white lg:text-5xl">Order your favourite food here!</h2>
        <p className='hidden text-white lg:block lg:text-xl'>Savor a diverse menu offering an exquisite selection of dishes, expertly crafted with the finest ingredients and culinary mastery.</p>
        <button className="border-0 text-md px-3 py-1 font-bold text-gray-950 md:px-6 md:py-3 bg-white md:text-xl rounded-3xl">View Menu</button>
      </div>

    </div>
  )
}

export default Header
