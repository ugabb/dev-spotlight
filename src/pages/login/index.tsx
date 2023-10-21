import React from 'react'

import { getSession, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { redirect } from 'next/dist/server/api-utils'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}

const login = () => {

  return (
    <div className='text-white flex flex-col justify-center items-center h-full'>
      <h1 className='text-4xl'>DevSpotlight</h1>
      <form className='flex flex-col gap-3 '>
        <input type="email" className='input-outline' />
        <input type="password" className='input-outline ' />
      </form>
      <button type="button" onClick={() => signIn('github')}>Login</button>
      <button type='button'>GITHUB</button>
    </div>
  )
}

export default login