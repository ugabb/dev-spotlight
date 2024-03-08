import Carousel from '@/components/Carousel/Carousel'
import Header from '@/components/Header/Header'
import React, { useEffect, useState } from 'react'
import { GoHeart, GoHeartFill } from 'react-icons/go'

import Image from 'next/image';
import { SwiperProps, SwiperSlide } from 'swiper/react';

import { IoShareSocialOutline } from "react-icons/io5";
import { FaXTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { PiBookmarkSimpleFill, PiBookmarkSimpleLight } from "react-icons/pi";
import { RxExternalLink } from "react-icons/rx";
import { FaReact } from 'react-icons/fa';

import TextIcon from '@/components/TextIcon';
import ButtonIcon from '@/components/ButtonIcon';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ButtonWide from '@/components/ButtonWide';
import { IProject, IProjectToCreate, ITechnologies } from '@/interfaces/IProject';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useSession } from 'next-auth/react';
import { IUser } from '@/interfaces/IUser';
import CarouselShad from '@/components/Carousel/CarouselShad';
import { useParams, useSearchParams } from 'next/navigation';

// share
import { LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Toast } from '@/components/Toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DialogComponent from '@/components/Dialog';
import axios from 'axios';
import toast from 'react-hot-toast';
import getCurrentUser from '@/actions/getCurrentUser';
import userStore from '@/store/userStore';
import { Project, ProjectsLiked } from '@prisma/client';

const ProjectsDetails = () => {

  const { query, asPath } = useRouter()
  const { data: session } = useSession()
  const username = session?.user?.username

  // zustand store
  const { setCurrentUser, currentUser } = userStore((state) => state)

  useEffect(() => {
    setCurrentUser(username)
  }, [username])
  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser])

  const [iconBookmark, setIconBookmark] = useState(false);

  // check if the user already liked this project
  // const handleIsAlreadyLiked = async (projectId: string) => {
  //   if (!session.user) {
  //     return
  //   }

  //   try {
  //     await currentProject.projectsLikdd
  //   } catch (error) {

  //   }
  // }

  const handleAddLike = async (projectId: string) => {
    if (!session.user) {
      toast.error("You need to sign in to like!")
      return
    }
    try {
      const response = await axios.post(`/api/projects/like/add`, {
        projectId,
        username
      });
      console.log(response)
      const data: IProject = await response.data;
      const likesUpdated = data.likes;
      if (response.statusText === "OK") {
        setIconHeart(true);
        console.log(likesUpdated)
        currentProject.likes = likesUpdated;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data, { iconTheme: { primary: "#B95AFF", secondary: "#fff" } })
    }
  }

  const handleRemoveLike = async (projectId: string) => {
    if (!session.user) {
      toast.error("You need to sign in to dislike!")
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/projects/${projectId}/likes/remove`, { method: "POST" });
      const data: IProject = await response.json();
      const likesUpdated = data.likes;
      if (response.ok) {
        setIconHeart(false);
        currentProject.likes = likesUpdated;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddToFavorites = async (projectId: string, userId: string) => {

    try {
      const response = await axios.post("/api/projects/favorite-project", {
        projectId,
        userId
      })

      if (response.statusText === "OK") {
        toast.success(response.data.message, { iconTheme: { primary: "#B95AFF", secondary: "#fff" } })
        setIconBookmark(prev => prev === false ? true : false)
      }
    } catch (error) {
      toast.error(error.response.data, { iconTheme: { primary: "#B95AFF", secondary: "#fff" } })
    }
  }

  const [isMounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  const [projectToFetch, setProjectToFetch] = useState({
    projectName: '',
    userId: 0
  });


  const [projects, setProjects] = useState<IProject[]>([]);
  const [currentProject, setCurrentProject] = useState<IProject>();
  const [openShare, setOpenShare] = useState<boolean>(false);
  const handleOpenShareDialog = () => setOpenShare(share => !share);

  const userProfilePhoto = currentProject?.user?.githubProfilePhoto

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

  const handleFetchProjectByName = async (username: string, projectName: string) => {
    try {
      console.log('Fetching project by name:', username, projectName);
      const response = await fetch(`/api/projects/${username}/${projectName}`);
      const data = await response.json();
      console.log('API Response:', response);
      console.log('Data:', data);

      if (response.ok) {
        setCurrentProject(data);
        if (data.ProjectsLiked.userId === session.user.id) {
          console.log(session.user.id)
          setIconHeart(true)
        }
      } else {
        console.error('Error fetching project:', response.status, data);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const handleFetchProjects = async () => {
    try {
      const response = await fetch('/api/projects', {
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
    if (query?.projectDetails) {
      const username = query?.projectDetails[2]
      const projectName = query?.projectDetails[0]
      if (username && projectName) {
        handleFetchProjectByName(username, projectName)
      }
    }

  }, [query])

  // icon heart
  const [iconHeart, setIconHeart] = useState(false);
  const isCurrentUserAlreadyLikedTheProject = (currentProjectId: string) => {
    const currentUserProjectsLiked = currentUser?.ProjectsLiked;

    if (currentUserProjectsLiked) {
      const projectExist = currentUserProjectsLiked.find((project: ProjectsLiked) => {
        return project.projectId === currentProjectId
      })


      if (projectExist) return setIconHeart(true);
    }

    return setIconHeart(false)
  }
  useEffect(() => {
    isCurrentUserAlreadyLikedTheProject(currentProject?.id)
  }, [currentProject, currentUser])



  const isCurrentUserAlreadySavedAsFavoriteProject = (currentProjectId: string) => {
    const currentProjectsSaved = currentUser?.favoritesProjects;
    if (currentProjectsSaved) {
      const isProjectAlreadySaved = currentProjectsSaved.find((project) => project.projectId === currentProjectId)
      if (isProjectAlreadySaved) return setIconBookmark(true);
    }

    return setIconBookmark(false);
  }
  useEffect(() => {
    isCurrentUserAlreadySavedAsFavoriteProject(currentProject?.id)
  }, [currentProject, currentUser])

  // useEffect(() => {
  //   console.log(projects)
  // }, [projects])
  // useEffect(() => {
  //   console.log(currentProject)
  // }, [currentProject])

  return (
    <div className='md:py-24 md:max-w-7xl mx-auto'>
      <Header />
      {isMounted && (
        <div className='lg:px-20 mx-auto space-y-5 p-3 '>
          <div className='flex justify-between gap-3'>
            <h1 className='text-2xl font-bold text-mainGray tracking-widest uppercase font-georgeTown break-all'>{query.projectDetails && query?.projectDetails[0]}</h1>
            <div className="flex  gap-3">
              <motion.div className='flex flex-col items-center transition-all ease-in-out cursor-pointer'>
                {iconBookmark ? <PiBookmarkSimpleFill onClick={() => handleAddToFavorites(currentProject?.id, currentUser?.id)} size={25} className='text-mainPurple' /> : <PiBookmarkSimpleLight className='text-mainGray hover:text-mainPurple transition-colors' onClick={() => handleAddToFavorites(currentProject?.id, currentUser?.id)} size={25} />}
              </motion.div>
              <motion.div className='flex flex-col items-center transition-all ease-in-out cursor-pointer'>
                {iconHeart ? <GoHeartFill onClick={() => handleRemoveLike(currentProject?.id)} size={25} className='text-mainPurple' /> : <GoHeart className='text-mainGray hover:text-mainPurple transition-colors' onClick={() => handleAddLike(currentProject?.id)} size={25} />}
                <p className='text-mainGray text-xs'>{currentProject?.likes}</p>
              </motion.div>
            </div>


          </div>

          {/* CArousel */}
          <div className="md:mx-auto flex flex-col items-center ">
            <CarouselShad images={currentProject?.projectImages} />
          </div>


          <section className='space-y-3 md:mx-auto flex flex-col'>
            <h1 className='text-2xl text-mainGray font-bold tracking-widest uppercase font-georgeTown'>About</h1>
            <p className='text-xs md:text-base lg:text-lg break-words text-mainGray leading-4'>{currentProject?.description}</p>
          </section>

          <h1 className='text-2xl text-mainGray font-bold tracking-widest uppercase font-georgeTown pt-20'>Technologies</h1>
          <section className='flex flex-col lg:mx-auto lg:w-full'>
            <div className="grid grid-cols-2 gap-3 mx-auto lg:content-start lg:mx-0 lg:flex lg:flex-wrap">
              {currentProject?.technologies && currentProject?.technologies.map((tech: ITechnologies, i) => (
                <p key={tech?.id} className={`text-center max-w-max  text-white px-3 py-1 rounded-md bg-mainPurple`}>{tech?.name}</p>
              ))}
            </div>
          </section>

          {/* MOBILE */}
          <div className="grid grid-cols-2 md:hidden items-start  gap-1">
            <Link href={currentProject?.deployedLink || ''} target='_blank'>
              <ButtonIcon icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Live Demo' textColor='mainGray' textSize='sm' />
            </Link>
            <Link href={currentProject?.linkRepo || ''}>
              <ButtonIcon icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Repository' textColor='mainGray' textSize='sm' />
            </Link>

            <ButtonIcon icon={<Image src={'/copy-icon.svg'} width={15} height={15} alt='icon' />} text='Clone Project' textColor='mainGray' textSize='sm' onClick={() => navigator.clipboard.writeText(currentProject?.linkRepo + ".git")} />

            <Link href={'/'}>
              <ButtonIcon icon={<IoShareSocialOutline size={15} className='text-mainPurple' />} text='Share' textColor='mainGray' textSize='sm' />
            </Link>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex justify-center items-center">
            <div className="grid grid-cols-2 gap-3">
              <Link href={currentProject?.deployedLink || ''} target='_blank' className={`${!currentProject?.deployedLink && "grayscale opacity-50 cursor-default"}`}>
                <ButtonWide icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Live Demo' disabled={!currentProject?.deployedLink} />
              </Link>
              <Link href={currentProject?.linkRepo || ''} target='_blank' >
                <ButtonWide icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Repository' />
              </Link>

              <Toast cloneLink={currentProject?.linkRepo} />

              <Dialog>
                <DialogTrigger>
                  <ButtonWide icon={<IoShareSocialOutline size={15} className='text-mainPurple' />} text='Share' />
                </DialogTrigger>
                <DialogContent className='h-auto w-[300px] md:w-full md:h-[300px] backdrop-blur-sm shadow-lg shadow-mainPurple'>
                  <DialogHeader >
                    <DialogTitle className='font-georgeTown tracking-widest'>Share Project</DialogTitle>
                    <DialogDescription className='flex flex-col justify-center items-center h-full'>
                      {isMounted &&
                        <div className='flex flex-col md:flex-row gap-5 my-3'>
                          <LinkedinShareButton url={`http://dev-spotlight.vercel.app${asPath}`} >
                            <FaLinkedin className='text-7xl text-mainPurple' />
                          </LinkedinShareButton>
                          <TwitterShareButton url={`http://dev-spotlight.vercel.app${asPath}`} >
                            <FaXTwitter className='text-7xl text-mainPurple' />
                          </TwitterShareButton>
                          <WhatsappShareButton url={`http://dev-spotlight.vercel.app${asPath}`} >
                            <FaWhatsapp className='text-7xl text-mainPurple' />
                          </WhatsappShareButton>
                        </div>
                      }
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>




            </div>
          </div>



          <section>
            <h1 className='text-2xl text-mainGray font-bold tracking-widest uppercase font-georgeTown'>Creator</h1>
            <div className="flex gap-3">
              <Image className='w-[55px] h-[55px] rounded-full' src={currentProject?.user?.githubProfilePhoto ? currentProject?.user?.githubProfilePhoto : ""} width={640} height={640} alt='' />
              <div>
                <h4 className='text-sm text-mainGray font-bold'>{currentProject?.user?.name}</h4>
                <p className='text-xs text-mainGray'>@{currentProject?.user?.username}</p>
                <p className='text-xs text-white bg-mainPurple rounded-md px-1'>Web Devoloper</p>

              </div>
            </div>
          </section>

          <h2 className='text-xl text-mainGray text-center'>Others Projects</h2>

          <motion.div

            className="flex flex-col justify-center items-center  gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 mt-10 max-w-6xl lg:mx-auto">
            {projects?.slice(0, 3).map(project => {
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
      )}
    </div>
  )
}

export default ProjectsDetails