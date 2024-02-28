import Image from 'next/image'
import Header from '@/components/Header/Header'
import TextIcon from '@/components/TextIcon'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { BsLightning } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { TbBulb } from "react-icons/tb";
import { motion } from 'framer-motion'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import { useEffect, useState } from 'react'
import { IProject, IProjectToCreate } from '@/interfaces/IProject'
import Footer from '@/components/Footer'
import { Spotlight } from '@/components/acertenity-ui/Spotlight';

export default function Home() {


  const [projects, setProjects] = useState<IProject[]>([]);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true)
  }, [])


  const handleFetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include',
      })
      const data = await response.json()
      setProjects(data?.projects)
    } catch (error) {

    }
  }

  useEffect(() => {
    handleFetchProjects()
    // window.scrollTo({ top: 0 })
  }, [])

  return (
    <div className='flex flex-col gap-3  mx-auto overflow-hidden relative'>
      {isMounted &&
        <video autoPlay loop muted className='fixed z-0 h-screen w-screen top-0 left-0 object-cover opacity-30'>
          <source src='/particles.mp4' />
        </video>
      }
      <Header />

      <motion.main
        className='flex-grow flex flex-col justify-center items-center px-3 gap-3 md:px-20  md:my-24 lg:max-w-6xl xl:mx-auto z-10'>
        <Spotlight className='hidden lg:block left-[450px]' />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        
          transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0.2 }}
          className='flex flex-col md:flex-row justify-center items-center w-full md:gap-20'>
          <div className="flex flex-col justify-center m-10 font-bold">
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className='text-7xl text-mainGray'>Develop</motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
              className='text-7xl text-mainGray'>Share</motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2 }}
              className='text-7xl glow-text animate-pulse'>Shine</motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 gap-5 h-[300px] w-[300px]">
            <Image className="w-full h-[140px] object-cover rounded-lg shadow-lg shadow-mainPurple/20" src='/man-computer.jpg' alt='Man in front of computer' width={1920} height={1280} />
            <Image className="w-full h-[140px] object-cover rounded-lg shadow-lg shadow-mainPurple/20" src='/jose.jpg' alt='Man in front of computer' width={1920} height={1280} />
            <Image className="w-full h-[140px] object-cover rounded-lg shadow-lg shadow-mainPurple/20" src='/pc-triste.jpg' alt='Man in front of computer' width={1920} height={1280} />
            <Image className="w-full h-[140px] object-cover rounded-lg shadow-lg shadow-mainPurple/20" src='/cafe.jpg' alt='Man in front of computer' width={1920} height={1280} />
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        
          transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0.5 }}
          className="">
          <div className='text-[#B9B9B9] text-sm md:text-base mb-10'>
            <p className='text-white inline-block'><span className='text-mainPurple'>Dev</span>Spotlight</p> {" "}
            is a dynamic online platform designed to empower developers and creators from around the world to showcase their coding skills, development projects, and design prowess. It acts as a hub where tech enthusiasts, programmers, and designers can connect, collaborate, and shine a spotlight on their talents.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        
          transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0.2 }}
          className='flex flex-col justify-center items-center gap-3 border-y border-mainPurple w-screen p-3 mb-10 backdrop-blur-sm bg-white/3'>
          <h3 className='text-2xl font-bold font-george'>Why to use?</h3>
          <div className="flex gap-3 md:gap-10">
            <div className="flex flex-col md:flex-row md:text-lg gap-3 md:gap-10">
              <TextIcon text='Career Growth' textColor='mainGray' icon={<MdKeyboardDoubleArrowUp className='text-mainPurple' />} wrap='' />
              <TextIcon text='Skill Enhancement' textColor='mainGray' icon={<BsLightning className='text-mainPurple' />} wrap='' />
            </div>
            <div className="flex flex-col md:flex-row md:text-lg gap-3 md:gap-10">
              <TextIcon text='Networking' textColor='mainGray' icon={<CiGlobe className='text-mainPurple' />} wrap='' />
              <TextIcon text='Inspiration' textColor='mainGray' icon={<TbBulb className='text-mainPurple' />} wrap='' />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        
          transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0.7 }}
          className="space-y-3  space-x-3 mb-10 lg:grid lg:grid-cols-2 ">
          <div className="flex flex-col gap-1 ">
            <h3 className="text-xl font-bold">Project Showcase</h3>
            <div className='text-mainGray text-sm md:text-base'><p className='text-white inline-block'><span className='text-mainPurple'>Dev</span>Spotlight</p> {" "} allows users to share individual projects, providing detailed <span className='text-mainPurple'>descriptions</span>, <span className='text-mainPurple'>screenshots</span>, and <span className='text-mainPurple'>live demos</span>.</div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">Discussion Forums</h3>
            <div className='text-mainGray text-sm md:text-base'>The platform hosts discussion forums where users can <span className='text-mainPurple'>ask</span> questions, <span className='text-mainPurple'>share</span> <span className='text-mainPurple'>knowledge</span>, and <span className='text-mainPurple'>engage</span> in technical discussions.</div>
          </div>
        </motion.div>

        <div className='flex flex-col gap-5 justify-center items-center my-5'>
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          
            transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0.7 }}
            className='text-2xl lg:text-3xl text-white font-bold'>Projects</motion.h1>

          <div className='flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
            {projects?.map(project => {
              return (
                <motion.div key={project.id}
                // initial={{ opacity: 0, x: `${3 * project}px` }}
                // animate={{ opacity: 1, x: '0px' }}
                // exit={{ opacity: 0 }}
                >
                  <ProjectCard project={project} />
                </motion.div>

              )
            })}
          </div>



        </div>


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        
          transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 1 }}
          className='flex flex-col justify-center items-center  w-screen lg:w-full h-[160px] mb-28'>
          <Link href="/projects" className='border z-10 border-white rounded-md px-5 py-2 text-lg absolute hover:bg-white hover:text-mainPurple transition-all ease-in-out'>See All Projects</Link>
          <Image className="w-full h-full object-cover brightness-50 rounded-lg" src='/man-computer.jpg' alt='Man in front of computer' width={1920} height={1280} />
        </motion.div>

      </motion.main>

      <Footer />

    </div>
  )
}