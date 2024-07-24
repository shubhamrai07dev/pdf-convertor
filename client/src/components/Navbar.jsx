import React from 'react'

function Navbar() {
  return (
      <div className='max-w-screen mx-auto container px-6 md:px-40 shadow-lg h-10 fixed' > 
          <data className='flex justify-between items-center'>
              <h1 className='text-2xl cursor-pointer font-bold'><span className='text-xl text-blue-500'>Word</span>To<span className='text-xl text-red-500'>PDF</span></h1>
              <a href="http://localhost:5173/?"> <h1 className='text-xl cursor-pointer font-bold hover:scale-110 duration-300'>Home</h1></a>
          </data>
      </div>
  )
}

export default Navbar