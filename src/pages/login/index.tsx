import React from 'react'
const login = () => {

  return (
    <div className='text-white flex flex-col justify-center items-center h-full'>
      <h1 className='text-4xl'>DevSpotlight</h1>
      <form className='flex flex-col gap-3 '>
        <input type="email" className='input-outline' />
        <input type="password" className='input-outline ' />
      </form>
      <button type="button">Login</button>

    </div>
  )
}

export default login