import Header from '@/components/Header/Header'
import ProjectCard from '@/components/ProjectCard'
import { IProject } from '@/interfaces/IProject'
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { IoFilterOutline } from "react-icons/io5";
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'

// shadcn
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const Projects = () => {
  const animationX = [0, 10, 20, 30, 40, 50, 60, 70]

  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectFiltered, setProjectsFiltered] = useState<IProject[]>([]);
  const [projectFilteredToast, setProjectsFilteredToast] = useState<boolean>(false);
  const router = useRouter();

  // filter project
  // 1 -> filter function reacts each input and filter the name
  const handleProjectsFilterByName = (e: any) => {
    setProjectsFiltered([])
    const typed = e?.target?.value;
    const filtered = projects.filter(project => project.name.toLowerCase().includes(typed))

    if (filtered.length <= 0 || typed !== "") {
      setProjectsFilteredToast(true)
    } else {
      setProjectsFilteredToast(false)
    }
    return setProjectsFiltered(filtered)
  }


  // fetch projects
  const handleFetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/projects', {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include',

      })

      const data = await response.json()
      console.log(data)
      setProjects(data)

    } catch (error) {

    }
  }

  useEffect(() => {
    handleFetchProjects()
  }, [router.query])
  // useEffect(() => {
  //   console.log(projects)
  // }, [projects])
  useEffect(() => {
    console.log({ projectFiltered })
  }, [projectFiltered])


  return (
    <div className='lg:flex lg:flex-col '>
      <video autoPlay loop muted className='fixed -z-10 h-full w-full top-0 left-0 object-cover opacity-30'>
        <source src='/particles.mp4' />
      </video>
      <Header />
      <div className="flex flex-col justify-center items-center p-3 gap-3">
        <h1 className='text-3xl md:text-4xl text-center text-mainGray font-bold font-georgeTown tracking-widest uppercase mt-24'>Projects</h1>
        <div className="flex gap-3">
          <div className="flex items-center justify-between px-2 py-1 border rounded-md w-full md:w-[250px]">
            <input type="text" className='bg-transparent placeholder:text-sm outline-none' placeholder='Search by Project name' onChange={(e) => handleProjectsFilterByName(e)} />
            <AiOutlineSearch className='text-xl' />
          </div>

          {/* <div className="flex items-center justify-between px-2 py-1 border rounded-md w-full md:w-[100px]">
            <input type="text" className='bg-transparent placeholder:text-sm w-full outline-none' placeholder='Filter' />
            <IoFilterOutline className='text-xl' />
          </div> */}
        </div>
      </div>



      <motion.div
        className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-3 my-10 p-2 lg:px-40 mx-auto">
        {projectFiltered.length > 0 &&
          projectFiltered.slice().reverse().map(project => {
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

        {(projects && projectFiltered.length <= 0) && projects.slice().reverse().map(project => {
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
      </motion.div>

      {projectFilteredToast &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='fixed bottom-5 md:right-5 z-50 p-5'>
          <Alert className='border border-red-500 backdrop-blur-sm   relative '>
            <AlertTitle className='text-red-500 flex justify-between font-bold text-lg'>
              Not Found!
              <AiOutlineClose className=' text-red-500 cursor-pointer' onClick={() => setProjectsFilteredToast(false)} />
            </AlertTitle>
            <AlertDescription className='text-red-500'>
              The Project that you are looking for doesn't exist.
            </AlertDescription>

          </Alert>
        </motion.div>}
    </div>
  )
}

export default Projects
