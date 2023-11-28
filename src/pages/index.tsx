import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import { Typewriter } from 'react-simple-typewriter'
import Logo from '@/components/Logo'
import TextIcon from '@/components/TextIcon'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { motion } from 'framer-motion'


const inter = Inter({ subsets: ['latin'] })

const words = ['Develop', 'Share', 'Shine']

export default function Home() {

  return (
    <div className='flex flex-col gap-3 px-3 max-w-5xl mx-auto'>
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        exit={{ opacity: 0 }}
        className='flex flex-col justify-center items-center gap-3 md:my-24'>

        <div className="flex flex-col gap-3 justify-center items-end">
          <h1 className='text-5xl font-georgeTown glow-text h-[50px]'><Typewriter words={words} loop={true} /></h1>
        </div>


        <div className="">
          <div className='text-[#B9B9B9] text-sm'>
            <p className='text-white inline-block'><span className='text-mainPurple'>Dev</span>Spotlight</p> {" "}
            is a dynamic online platform designed to empower developers and creators from around the world to showcase their coding skills, development projects, and design prowess. It acts as a hub where tech enthusiasts, programmers, and designers can connect, collaborate, and shine a spotlight on their talents.
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-3 border-y border-mainPurple w-screen p-3'>
          <h3 className='text-2xl font-bold font-george'>Why to use?</h3>
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              <TextIcon text='Career Growth' icon={<AiOutlineArrowUp className='text-mainPurple' />} />
              <TextIcon text='Career Growth' icon={<AiOutlineArrowUp className='text-mainPurple' />} />
            </div>
            <div className="flex flex-col gap-3">
              <TextIcon text='Career Growth' icon={<AiOutlineArrowUp className='text-mainPurple' />} />
              <TextIcon text='Career Growth' icon={<AiOutlineArrowUp className='text-mainPurple' />} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">Project Showcase</h3>
          <div className='text-mainGray text-sm'><p className='text-white inline-block'><span className='text-mainPurple'>Dev</span>Spotlight</p> {" "} allows users to share individual projects, providing detailed <span className='text-mainPurple'>descriptions</span>, <span className='text-mainPurple'>screenshots</span>, and <span className='text-mainPurple'>live demos</span>.</div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">Discussion Forums</h3>
          <div className='text-mainGray text-sm'>The platform hosts discussion forums where users can <span className='text-mainPurple'>ask</span> questions, <span className='text-mainPurple'>share</span> <span className='text-mainPurple'>knowledge</span>, and <span className='text-mainPurple'>engage</span> in technical discussions.</div>
        </div>

      </motion.main>

    </div>
  )
}