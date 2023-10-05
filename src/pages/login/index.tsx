import React from 'react'

import { useSession, signIn, signOut } from "next-auth/react"

const login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }

  return (
    <div className='text-white bg-mainPurple'>
      <h1>DevSpotlight</h1>
      <p>Not Signed in</p>
      <button type="button" onClick={() => signIn()}>Login</button>
    </div>
  )
}

export default login