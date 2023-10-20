import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  console.log(session)
  return (
    <main className='flex flex-col'>
      <h1 className='text-4xl font-bold'>Home</h1>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <button onClick={() => signOut()} className='bg-mainPurple px-5 py-1 rounded font-bold hover:bg-mainPurple/50'>Sign out</button>
    </main>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
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