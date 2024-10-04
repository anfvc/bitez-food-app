import React from 'react'

function Header() {
  return (
    <div className="header h-34vw my-12 mx-auto bg-backgroundImage bg-no-repeat bg-contain max-w-1/2  relative">
      <div className="header-content absolute flex flex-col items-start gap-6 max-w-3xl bottom-20 left-24">
        <h2 className="font-semibold text-white text-7xl">Order your favourite food here!</h2>
        <p className='text-white text-xl'>Savor a diverse menu offering an exquisite selection of dishes, expertly crafted with the finest ingredients and culinary mastery.</p>
        <button className="border-0 font-bold text-gray-500 px-6 py-3 bg-white text-xl rounded-3xl">View Menu</button>
      </div>

    </div>
  )
}

export default Header
