import React, { useState } from 'react'
import TextIcon from './TextIcon'

//icons
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaReact, FaGithub } from "react-icons/fa";


import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { IProject } from '@/interfaces/IProject';
import { useSession } from 'next-auth/react';

type Props = {
    project: IProject
}

const ProjectCard = ({ project }: Props) => {
    const [iconHeart, setIconHeart] = useState(false)

    const handleIconHeartShow = () => {
        setIconHeart(true);
    }
    const handleIconHeartHide = () => {
        setIconHeart(false);
    }

    // const {data:session} = useSession();
    // const userProfilePhoto = session.user.githubProfilePhoto;

    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1,  }}
            transition={{ duration: 1 }}

            className='flex flex-col  bg-white/5 backdrop-blur-sm  border border-gray-500  rounded-[27px]  p-2 relative max-w-[400px]'>
            <div className='flex gap-3 justify-between items-center '>
                <div className='flex flex-col w-10 h-10'>
                    <Image className='rounded-full object-cover' src={"/user.jpg"} width={40} height={40} alt='profile picture' />
                    <p className='text-mainGray text-xs flex items-center'>ugabb</p>
                </div>

                <h2 className='text-xl font-bold truncate hover:text-mainPurple'>{project?.name}</h2>

                <motion.div
                    onMouseEnter={handleIconHeartShow} onMouseLeave={handleIconHeartHide} className='transition-all ease-in-out cursor-pointer'>
                    {iconHeart ? <GoHeartFill size={25} className='text-mainPurple' /> : <GoHeart size={25} />}
                </motion.div>
            </div >

            <div className="flex flex-col w-full mt-5 px-3">
                <Link href={`/projects/details/${project.name}`} className='flex justify-center  w-full h-32 hover:border hover:border-mainPurple hover:rounded-md'>
                    <Image className='object-cover rounded-md w-full ' src={project.projectImages[0].url} width={1920} height={1280} alt='profile picture' />
                </Link>
            </div>

            <div className='p-3 text-mainGray w-full'>
                <h3 className='text-xl text-white font-bold'>About</h3>
                <p className='text-sm leading-4 break-words'>{project?.description}</p>
            </div>

            <div className="flex flex-wrap gap-1 text-sm px-3 my-3">
                {project?.technologies.map((tech,id) => (
                    <span className={`text-mainPurple text-xs p-1 rounded-md border border-mainPurple`} key={id}>{tech.name}</span>
                ))}
            </div>

            <div className="flex justify-center gap-3 p-3  mx-auto text-mainGray ">
                <Link className='flex gap-3 items-center  rounded-md px-2 py-1 hover:text-mainPurple hover:bg-white font-semibold bg-mainPurple text-white   transition-colors' href={project ? project.linkRepo : '/'} target='_blank'>
                    <p>GitHub</p>
                    <AiOutlineArrowRight />
                </Link>
                <Link className='flex gap-3 items-center  rounded-md px-2 py-1 hover:text-mainPurple hover:bg-white font-semibold bg-mainPurple text-white  transition-colors' href={`/projects/details/${project.name}`}>
                    <p>More</p>
                    <AiOutlineArrowRight />

                </Link>
            </div>
        </motion.div >
    )
}

export default ProjectCard