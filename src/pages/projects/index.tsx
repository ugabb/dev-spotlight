import Header from '@/components/Header/Header'
import ProjectCard from '@/components/ProjectCard'
import { motion } from 'framer-motion'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const Projects = () => {
  const animationX = [0, 10, 20, 30, 40, 50, 60, 70]
  return (
    <div className='flex flex-col'>
      <Header />

      <h1 className='text-3xl md:text-4xl text-center text-mainGray font-bold font-georgeTown tracking-widest uppercase mt-24'>Projects</h1>

      <div className="flex items-center justify-between px-2 py-1 border rounded-md mx-auto">
        <input type="text" className='bg-transparent placeholder:text-sm' placeholder='Search by Project name or user' />
        <AiOutlineSearch className='text-xl' />
      </div>

      <motion.div

        className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-10 mx-auto">
        {animationX.map(project => {
          return (
            <motion.div key={project}
              initial={{ opacity: 0, x: `${3 * project}px` }}
              animate={{ opacity: 1, x: '0px' }}
              exit={{ opacity: 0 }}
            >
              <ProjectCard />
            </motion.div>

          )
        })}
      </motion.div>



    </div>
  )
}

export default Projects