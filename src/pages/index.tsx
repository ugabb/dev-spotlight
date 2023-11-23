import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import { Typewriter } from 'react-simple-typewriter'


const inter = Inter({ subsets: ['latin'] })

const words = ['Develop', 'Share', 'and', 'Shine']

export default function Home() {

  return (
    <div className='flex flex-col p-3'>
      <Header />

      <h1 className='text-4xl '><Typewriter words={words} /></h1>

      <h1 className='text-4xl font-bold'>Home</h1>
      <button className='bg-mainPurple px-5 py-1 rounded font-bold hover:bg-mainPurple/50'>Sign out</button>
    </div>
  )
}