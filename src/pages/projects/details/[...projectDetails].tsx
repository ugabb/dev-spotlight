
import Header from '@/components/Header/Header'
import React, { useEffect, useState } from 'react'
import { GoHeart, GoHeartFill } from 'react-icons/go'

import Image from 'next/image';

import { IoShareSocialOutline } from "react-icons/io5";
import { FaXTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { PiArrowArcLeft, PiBookmarkSimpleFill, PiBookmarkSimpleLight, PiCaretDown, PiTrash, PiUser } from "react-icons/pi";

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

import parse from 'html-react-parser';

// share
import { LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Toast } from '@/components/Toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';
import toast from 'react-hot-toast';
import userStore from '@/store/userStore';
import { ProjectsLiked } from '@prisma/client';
import Loading from '@/components/Loading';
import { Skeleton } from '@/components/ui/skeleton';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';

const ProjectsDetails = () => {
  const [loading, setLoading] = useState(false)

  const { query, asPath } = useRouter()
  const { data: session } = useSession()
  const username = session?.user?.username

  // zustand store
  const { setCurrentUser, currentUser } = userStore((state) => state)

  useEffect(() => {
    if (username) {
      setCurrentUser(username)
    }
  }, [username])

  const [iconBookmark, setIconBookmark] = useState(false);

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
      const response = await axios.post(`/api/projects/like/remove`, {
        projectId,
        username
      });;
      const data: IProject = await response.data;
      const likesUpdated = data.likes;
      if (response.statusText === "OK") {
        setIconHeart(false);
        currentProject.likes = likesUpdated;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data, { iconTheme: { primary: "#B95AFF", secondary: "#fff" } })
    }
  }

  const handleAddToFavorites = async (projectId: string, userId: string) => {
    if (!session.user) {
      toast.error("You need to sign in to save as favorite!")
      return
    }

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
    setLoading(true)
    try {
      const { data, statusText } = await axios(`/api/projects/${username}/${projectName}`);
      if (statusText === "OK") {
        setLoading(false)
        setCurrentProject(data);
        if ((session?.user) && (data.ProjectsLiked.userId === session?.user?.id)) {
          setIconHeart(true)
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      setLoading(false)
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

  const handleDeleteProject = (projectId: string) => {
    axios.delete(`/api/projects/delete/${projectId}`).then((response) => {
      setLoading(true)
      if (response.statusText === "OK") {
        toast.success(response.data.message, { iconTheme: { primary: "#B95AFF", secondary: "#fff" } })
        router.push('/projects')
      }
    }).catch((error) => {
      console.error(error)
      toast.error(error.response.data, { iconTheme: { primary: "#B95AFF", secondary: "#fff" } })
    }).finally(() => {
      setLoading(false)
    })
  }


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
    if (currentUser) {
      isCurrentUserAlreadyLikedTheProject(currentProject?.id)
    }

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
    if(currentUser) isCurrentUserAlreadySavedAsFavoriteProject(currentProject?.id)
  }, [currentProject, currentUser])

  return (
    <>
      {loading && <Loading />}

      {currentProject &&
        <div className='md:py-24 md:max-w-7xl mx-auto'>
          <Header />
          {isMounted && (
            <div className='lg:px-20 mx-auto space-y-5 p-3 '>
              <div className='flex  lg:flex-row justify-between gap-3'>
                <div className="flex items-center gap-1">
                  <h1 className='text-2xl font-bold text-mainGray tracking-widest uppercase font-georgeTown break-all'>{query.projectDetails && query?.projectDetails[0]}</h1>
                  {username === currentProject?.user?.username &&
                    <Dropdown className='bg-zinc-950 border border-mainPurple/50 mt-2'>
                      <DropdownTrigger>
                        <div>
                          <PiCaretDown className='cursor-pointer' />
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Static Actions"
                        variant='shadow'
                        itemClasses={{
                          base: [
                            "rounded-md",
                            "text-mainGray",
                            "transition-opacity",
                            "data-[hover=true]:text-mainPurple",
                            "data-[hover=true]:font-bold",
                            "data-[hover=true]:bg-mainPurple/20",
                            "data-[selectable=true]:focus:bg-default-50",
                            "data-[pressed=true]:opacity-70",
                            "data-[focus-visible=true]:ring-default-500",
                          ],
                        }}
                      >
                        <DropdownItem variant='flat' key="settings" onClick={() => handleDeleteProject(currentProject.id)}>
                          <div className='flex items-center gap-1'>
                            <PiTrash className='cursor-pointer text-lg' />
                            <p>Delete Project</p>
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>}
                </div>

                <div className="flex fixed md:static right-1 bg-black md:bg-transparent z-[50] rounded-lg shadow-sm shadow-mainPurple md:shadow-none items-center md:items-start p-2  gap-3">
                  <motion.div className='flex flex-col items-center transition-all ease-in-out cursor-pointer'>
                    {iconBookmark ? <PiBookmarkSimpleFill onClick={() => handleAddToFavorites(currentProject?.id, currentUser?.id)} className='text-mainPurple text-sm lg:text-2xl' /> : <PiBookmarkSimpleLight className='text-mainGray hover:text-mainPurple transition-colors text-sm lg:text-2xl' onClick={() => handleAddToFavorites(currentProject?.id, currentUser?.id)} />}
                  </motion.div>
                  <motion.div className='flex flex-col items-center transition-all ease-in-out cursor-pointer'>
                    {iconHeart ? <GoHeartFill onClick={() => handleRemoveLike(currentProject?.id)} className='text-mainPurple text-sm lg:text-2xl' /> : <GoHeart className='text-mainGray hover:text-mainPurple transition-colors text-sm lg:text-2xl' onClick={() => handleAddLike(currentProject?.id)} />}
                    <p className='text-mainGray text-xs hidden lg:block'>{currentProject?.likes}</p>
                  </motion.div>
                </div>

              </div>

              {/* CArousel */}
              <div className="md:mx-auto flex flex-col items-center ">
                {loading && <Skeleton className='w-full max-w-2xl h-[300px] bg-mainGray/50' />}
                {(!loading && currentProject.projectImages.length !== 0) && <CarouselShad images={currentProject?.projectImages} />}
              </div>


              <section className='space-y-3 md:mx-auto flex flex-col'>
                <h1 className='text-2xl text-mainGray font-bold tracking-widest uppercase font-georgeTown'>About</h1>
                {loading
                  ?
                  <div className="flex flex-col gap-1">
                    <Skeleton className='w-full h-5 bg-mainGray/50' />
                    <Skeleton className='w-full h-5 bg-mainGray/50' />
                    <Skeleton className='w-full h-5 bg-mainGray/50' />
                    <Skeleton className='w-full h-5 bg-mainGray/50' />
                  </div>
                  :
                  <p className='text-xs md:text-base lg:text-lg break-words text-mainGray leading-4 prose prose-invert'>{parse(currentProject?.description)}</p>
                }
              </section>

              <h1 className='text-2xl text-mainGray font-bold tracking-widest uppercase font-georgeTown pt-20'>Technologies</h1>
              <section className='flex flex-col lg:mx-auto lg:w-full'>
                {loading
                  ?
                  <div className="flex gap-1">
                    <Skeleton className='w-16 h-5 bg-mainGray/50' />
                    <Skeleton className='w-16 h-5 bg-mainGray/50' />
                    <Skeleton className='w-16 h-5 bg-mainGray/50' />
                    <Skeleton className='w-16 h-5 bg-mainGray/50' />
                  </div>
                  :
                  <div className="grid grid-cols-2 gap-3 mx-auto lg:content-start lg:mx-0 lg:flex lg:flex-wrap">
                    {currentProject?.technologies && currentProject?.technologies.map((tech: ITechnologies, i) => (
                      <p key={tech?.id} className={`text-center max-w-max  text-white px-3 py-1 rounded-md bg-mainPurple`}>{tech?.name}</p>
                    ))}
                  </div>
                }

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
                  {userProfilePhoto
                    ?
                    <Image className='w-[55px] h-[55px] rounded-full' src={userProfilePhoto} width={640} height={640} alt='' />
                    :
                    <PiUser className='w-[55px] h-[55px] rounded-full border border-mainGray text-mainGray' />
                  }
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
      }

      {(!currentProject && !loading) &&
        <div className='flex flex-col justify-center items-center h-screen'>
          <Header />
          <h1>Something wrong while loading the project</h1>
          <Link href={"/projects"}>
            <ButtonIcon text='Back to projects' textColor='mainGray' textSize='lg' icon={<PiArrowArcLeft className='text-mainGray' />} />
          </Link>
        </div>
      }
    </>
  )
}

export default ProjectsDetails