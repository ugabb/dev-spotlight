import React, { useEffect, useState } from 'react'
import TextIcon from './TextIcon'

//icons
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GoHeart, GoHeartFill, GoLinkExternal } from "react-icons/go";
import { FaReact, FaGithub } from "react-icons/fa";


import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { IProject } from '@/interfaces/IProject';
import { useSession } from 'next-auth/react';
import { Project, ProjectsLiked } from '@prisma/client';
import userStore from '@/store/userStore';
import axios from 'axios';
import toast from 'react-hot-toast';

import parse from 'html-react-parser';

type Props = {
    project: IProject
}

const ProjectCard = ({ project }: Props) => {
    const { data: session } = useSession()
    const username = session?.user?.username

    const { setCurrentUser, currentUser } = userStore((state) => state)

    useEffect(() => {
        setCurrentUser(username)
    }, [username])

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
        isCurrentUserAlreadyLikedTheProject(project?.id)
    }, [project, currentUser])
    useEffect(() => {
        console.log(project);

    }, [project])

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
            const data: IProject = await response.data;
            const likesUpdated = data.likes;
            if (response.statusText === "OK") {
                setIconHeart(true);
                project.likes = likesUpdated;
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data, { iconTheme: { primary: "#B95AFF", secondary: "#fff" } })
        }
    }

    const handleRemoveLike = async (projectId: string) => {
        try {
            const { data, statusText } = await axios.post(`/api/projects/like/remove`, {
                projectId,
                username
            });
            const likesUpdated = data.likes;
            if (statusText === "OK") {
                setIconHeart(false);
                project.likes = likesUpdated;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const userProfilePhoto = project?.user?.image;


    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 1 }}

            className='flex flex-col  bg-white/5 backdrop-blur-sm  border border-gray-500  rounded-[27px]  p-2 relative w-[300px] md:w-full max-w-[400px] lg:min-w-[300px] '>
            <div className='flex gap-3 justify-between items-center '>
                <div className='flex flex-col w-10 h-10'>
                    <Image className='rounded-full object-cover  min-h-10 min-w-10' src={userProfilePhoto} width={40} height={40} alt='profile picture' />
                    <p className='text-mainGray text-xs flex items-center'>{project?.user?.username}</p>
                </div>

                <h2 className='text-xl font-bold truncate hover:text-mainPurple'>{project?.name}</h2>

                <motion.div className='flex flex-col items-center transition-all ease-in-out cursor-pointer'>
                    {iconHeart ? <GoHeartFill onClick={() => handleRemoveLike(project?.id)} size={25} className='text-mainPurple' /> : <GoHeart onClick={() => handleAddLike(project.id)} size={25} />}
                    <p className='text-mainGray text-xs'>{project?.likes}</p>
                </motion.div>
            </div >

            {project?.projectImages[0]?.url
                ?
                <div className="flex flex-col w-full mt-5 px-3">
                    <Link href={`/projects/details/${project.name}/user/${project?.user?.username}`} className='flex justify-center  w-full h-32 bg-gradient-to-transparent hover:border hover:border-mainPurple hover:rounded-md'>
                        <img className='object-cover rounded-md w-full ' src={project.projectImages[0].url} width={1920} height={1280} alt='profile picture' />
                    </Link>
                </div>
                :
                <div className="flex flex-col w-full mt-5 px-3 ">
                    <Link href={`/projects/details/${project.name}/user/${project?.user?.username}`} className='flex justify-center items-center bg-gradient-to-b from-mainPurple/10  hover:from-mainPurple  transition-colors ease-in-out rounded-md w-full h-32 hover:border hover:border-mainPurple hover:rounded-md text-mainGray hover:text-white'>
                        <GoLinkExternal className='text-5xl ' />
                    </Link>
                </div>
            }


            <div className='p-3 text-mainGray w-full mt-5'>
                <h3 className='text-xl text-white font-bold'>About</h3>
                {/* <p className='text-sm leading-4 break-words line-clamp-3'>{project?.description}</p> */}
                <p className='text-xs md:text-base lg:text-lg  text-mainGray leading-4  break-words line-clamp-3'>{parse(project?.description)}</p>

            </div>

            <div className="flex flex-wrap gap-1 text-sm px-3 my-3">
                {/* {project?.technologies.map((tech, id) => (
                    <span className={`text-mainPurple text-xs p-1 rounded-md border border-mainPurple`} key={id}>{tech.name}</span>
                ))} */}
            </div>

            <div className="flex justify-center gap-3 p-3  mx-auto text-mainGray ">
                <Link className='flex gap-3 items-center  rounded-md px-2 py-1 hover:text-mainPurple hover:bg-transparent border border-transparent hover:border-mainPurple font-semibold bg-mainPurple text-white   transition-colors' href={project ? project.linkRepo : '/'} target='_blank'>
                    <p>GitHub</p>
                    <AiOutlineArrowRight />
                </Link>
                <Link className='flex gap-3 items-center  rounded-md px-2 py-1 hover:text-mainPurple hover:bg-transparent border border-transparent hover:border-mainPurple font-semibold bg-mainPurple text-white  transition-colors' href={`/projects/details/${project.name}/user/${project?.user?.username}`}>
                    <p>More</p>
                    <AiOutlineArrowRight />

                </Link>
            </div>
        </motion.div >
    )
}

export default ProjectCard