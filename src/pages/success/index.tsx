import React from 'react'

const success = () => {

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8080/users')
      const data = response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (

    <div>
      <h1 className='text-5xl text-emerald-500'>success</h1>
      <button onClick={getData} className='bg-mainPurple px-5 py-1 rounded font-bold hover:bg-mainPurple/50'>Get Data</button>
    </div>
  )
}

export default success