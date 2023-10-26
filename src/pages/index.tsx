import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  // console.log(session)

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
    <main className='flex flex-col'>
      <h1 className='text-4xl font-bold'>Home</h1>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      {/* <button onClick={() => signOut()} className='bg-mainPurple px-5 py-1 rounded font-bold hover:bg-mainPurple/50'>Sign out</button> */}
      <button onClick={getData} className='bg-mainPurple px-5 py-1 rounded font-bold hover:bg-mainPurple/50'>Get Data</button>
      <Link href={'/login'}>Login</Link>
    </main>
  )
}


// export const getServerSideProps: GetServerSideProps = async (req, res) => {
//   const session = await getSession({req})
//   if (session) {
//     // Signed in
//     console.log("Session", JSON.stringify(session, null, 2))
//   } else {
//     // Not Signed in
//     res.status(401)
//   }
//   res.end()

// }

