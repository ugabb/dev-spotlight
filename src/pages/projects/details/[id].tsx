import Carousel from '@/components/Carousel/Carousel'
import Header from '@/components/Header/Header'
import React, { useEffect, useState } from 'react'
import { GoHeart, GoHeartFill } from 'react-icons/go'

import Image from 'next/image';
import { SwiperProps, SwiperSlide } from 'swiper/react';

import { IoShareSocialOutline } from "react-icons/io5";
import { RxExternalLink } from "react-icons/rx";
import { FaReact } from 'react-icons/fa';
import TextIcon from '@/components/TextIcon';
import ButtonIcon from '@/components/ButtonIcon';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ButtonWide from '@/components/ButtonWide';
import { IProject } from '@/interfaces/IProject';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useSession } from 'next-auth/react';
import { IUser } from '@/interfaces/IUser';
import CarouselShad from '@/components/Carousel/CarouselShad';
import { useParams, useSearchParams } from 'next/navigation';

// share
import { LinkedinShareButton } from 'react-share'
import { Toast } from '@/components/Toast';

const ProjectsDetails = () => {

  const { query, asPath } = useRouter()
  const { data: session } = useSession()
  const username = session?.user?.username

  const [iconHeart, setIconHeart] = useState(false)
  const [isMounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  const settings: SwiperProps = {
    spaceBetween: 50,
    slidesPerView: 1,
    navigation: true,
    pagination: {
      clickable: true
    }
  }


  const [userId, setUserId] = useState<number>(undefined);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [currentProject, setCurrentProject] = useState<IProject>();
  const router = useRouter();

  const getUserByUsername = async (username: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/username/${username}`)
      const data: IUser = await response.json();
      console.log(data)
      return data?.id;
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchProjectByName = async (userId: number, projectName: string) => {
    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API}/projects/${userId}/${projectName}`)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/projects/1/${projectName}`)
      const data = await response.json()

      setCurrentProject(data)
    } catch (error) {
      console.log(error)
    }
  }



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
    handleFetchProjectByName(userId, query?.id)
    handleFetchProjects()
    console.log(query)
  }, [query])
  useEffect(() => {
    console.log(currentProject)
  }, [currentProject])


  return (
    <div className='md:my-24 md:mx-20'>
      <Header />
      <div className='lg:px-20 mx-auto space-y-5 p-3'>
        <div className='flex justify-between gap-3'>
          <h1 className='text-2xl font-bold text-mainGray tracking-widest uppercase font-georgeTown break-all'>{query.id}</h1>
          {iconHeart ? <GoHeartFill size={25} className='text-mainPurple' /> : <GoHeart className='text-mainGray' size={25} />}
        </div>

        {/* CArousel */}
        <div className="md:mx-auto flex flex-col items-center ">
          <CarouselShad images={currentProject?.projectImages} />
        </div>

        <section className='space-y-3 md:mx-auto flex flex-col'>
          <h1 className='text-2xl text-mainGray font-bold tracking-widest uppercase font-georgeTown'>About</h1>
          <p className='text-xs md:text-base lg:text-lg text-mainGray leading-4'>{currentProject?.description}</p>
        </section>

        <h1 className='text-2xl text-mainGray font-bold tracking-widest uppercase font-georgeTown'>Technologies</h1>
        <section className='flex flex-col lg:justify-center lg:items-center lg:mx-auto lg:w-full'>
          <div className="grid grid-cols-2 gap-3 mx-auto lg:content-start lg:mx-0 lg:grid-cols-3">
            {currentProject?.technologies.map((tech) => (
              <p key={tech.name} className={`text-center max-w-max  text-white px-3 py-1 rounded-md bg-mainPurple`}>{tech.name}</p>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 md:hidden items-start  gap-1">
          <Link href={currentProject?.deployedLink || ''}>
            <ButtonIcon icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Live Demo' textColor='mainGray' textSize='sm' />
          </Link>
          <Link href={currentProject?.linkRepo || ''}>
            <ButtonIcon icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Repository' textColor='mainGray' textSize='sm' />
          </Link>

          <ButtonIcon icon={<Image src={'/copy-icon.svg'} width={15} height={15} alt='icon' />} text='Clone Project' textColor='mainGray' textSize='sm' onClick={() => navigator.clipboard.writeText(currentProject.linkRepo + ".git")} />

          <Link href={'/'}>
            <ButtonIcon icon={<IoShareSocialOutline size={15} className='text-mainPurple' />} text='Share' textColor='mainGray' textSize='sm' />
          </Link>
        </div>

        <div className="hidden md:flex justify-center items-center">
          <div className="grid grid-cols-2 gap-3">
            <Link href={currentProject?.deployedLink || ''}>
              <ButtonWide icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Live Demo' />
            </Link>
            <Link href={currentProject?.linkRepo || ''}>
              <ButtonWide icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Repository' />
            </Link>

            <Toast cloneLink={currentProject?.linkRepo} />


            {isMounted &&
              <LinkedinShareButton url={`http://dev-spotlight.vercel.app${asPath}`} >
                <ButtonWide icon={<IoShareSocialOutline size={15} className='text-mainPurple' />} text='Share' />
              </LinkedinShareButton>
            }


          </div>
        </div>



        <section>
          <h1 className='text-2xl text-mainGray font-bold tracking-widest uppercase font-georgeTown'>Creator</h1>
          <div className="flex gap-3">
            <Image className='w-[55px] h-[55px] rounded-full' src={'/user.jpg'} width={640} height={640} alt='' />
            <div>
              <h4 className='text-sm text-mainGray font-bold'>Gabriel Barros</h4>
              <p className='text-xs text-mainGray'>@ugabb</p>
              <p className='text-xs text-white bg-mainPurple rounded-md px-1'>Web Devoloper</p>

            </div>
          </div>
        </section>

        <h2 className='text-xl text-mainGray text-center'>Others Projects</h2>

        <motion.div

          className="flex flex-col justify-center items-center  gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 mt-10 max-w-6xl lg:mx-auto">
          {projects.slice(0, 3).map(project => {
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

      </div>
    </div>
  )
}

export default ProjectsDetails