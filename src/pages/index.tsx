import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import { Typewriter } from 'react-simple-typewriter'
import Logo from '@/components/Logo'
import TextIcon from '@/components/TextIcon'
import { AiOutlineArrowRight, AiOutlineArrowUp } from 'react-icons/ai'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'


const inter = Inter({ subsets: ['latin'] })

const words = ['Develop', 'Share', 'Shine']

export default function Home() {

  return (
    <div className='flex flex-col gap-3 mx-auto'>
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        exit={{ opacity: 0 }}
        className='flex flex-col justify-center items-center px-3 gap-3 md:px-20  md:my-24 lg:max-w-5xl xl:mx-auto'>

        <div className="flex flex-col gap-3 justify-center items-end ">
          <h1 className='text-5xl font-georgeTown glow-text h-[50px]'><Typewriter words={words} loop={true} /></h1>
        </div>


        <div className="">
          <div className='text-[#B9B9B9] text-sm md:text-base mb-10'>
            <p className='text-white inline-block'><span className='text-mainPurple'>Dev</span>Spotlight</p> {" "}
            is a dynamic online platform designed to empower developers and creators from around the world to showcase their coding skills, development projects, and design prowess. It acts as a hub where tech enthusiasts, programmers, and designers can connect, collaborate, and shine a spotlight on their talents.
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-3 border-y border-mainPurple w-screen p-3 mb-10'>
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

        <div className="space-y-3  space-x-3 mb-10 lg:grid lg:grid-cols-2 ">
          <div className="flex flex-col gap-1 ">
            <h3 className="text-xl font-bold">Project Showcase</h3>
            <div className='text-mainGray text-sm md:text-base'><p className='text-white inline-block'><span className='text-mainPurple'>Dev</span>Spotlight</p> {" "} allows users to share individual projects, providing detailed <span className='text-mainPurple'>descriptions</span>, <span className='text-mainPurple'>screenshots</span>, and <span className='text-mainPurple'>live demos</span>.</div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">Discussion Forums</h3>
            <div className='text-mainGray text-sm md:text-base'>The platform hosts discussion forums where users can <span className='text-mainPurple'>ask</span> questions, <span className='text-mainPurple'>share</span> <span className='text-mainPurple'>knowledge</span>, and <span className='text-mainPurple'>engage</span> in technical discussions.</div>
          </div>
        </div>

        <div className='flex flex-col gap-5 justify-center items-center my-5'>
          <div className='flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
          <Link className='flex gap-3 items-center  rounded-md px-2 py-1 hover:text-mainPurple   transition-colors' href="/details:id">
            <TextIcon text='See All Projects' icon={<AiOutlineArrowRight />} wrap='' />
          </Link>

        </div>


        <div className='flex flex-col justify-center items-center border-y border-mainPurple w-screen h-[160px]'>
          <Link href="/projects" className='border z-10 border-white rounded-md px-5 py-2 text-lg absolute hover:bg-white hover:text-mainPurple transition-all ease-in-out'>Share your Projects</Link>
          <Image className="w-full h-full object-cover brightness-50" src='/man-computer.jpg' alt='Man in front of computer' width={1920} height={1280} />
        </div>

      </motion.main>

      <footer className='h-[160px]  w-full bg-mainPurple px-3 py-5 '>
        <p>Dev-SpotiLght</p>
        <p>Created by: Gabriel Barros</p>
        <p>Github Twitter</p>
      </footer>

    </div>
  )
}