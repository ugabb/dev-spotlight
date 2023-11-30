import React, { useState } from 'react'
import TextIcon from './TextIcon'

//icons
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaReact } from "react-icons/fa";

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {}

const ProjectCard = (props: Props) => {
    const [iconHeart, setIconHeart] = useState(false)

    const handleIconHeartShow = () => {
        setIconHeart(true);
    }
    const handleIconHeartHide = () => {
        setIconHeart(false);
    }
    return (
        <motion.div

            className='flex flex-col  backdrop-blur-sm  border rounded-[27px] w-[300px] lg:max-w-[350px] md:w-full p-2 relative'>
            <div className='flex gap-3 justify-between items-center'>
                <div className='flex flex-col w-10 h-10'>
                    <Image className='rounded-full object-cover' src={"/user.jpg"} width={40} height={40} alt='profile picture' />
                    <p className='text-mainGray text-xs'>@ugabb</p>
                </div>
                <h2 className='text-xl font-bold'>Twenty One Pilots</h2>
                <motion.div
                    onMouseEnter={handleIconHeartShow} onMouseLeave={handleIconHeartHide} className='transition-all ease-in-out cursor-pointer'>
                    {iconHeart ? <GoHeartFill size={25} className='text-mainPurple' /> : <GoHeart size={25} />}
                </motion.div>
            </div >

            <div className="flex flex-col w-full mt-5">
                <div className='flex justify-center  w-full h-32'>
                    <Image className='object-cover rounded-md w-full ' src={"/man-computer.jpg"} width={1920} height={1280} alt='profile picture' />
                </div>
            </div>

            <div className='p-3 text-mainGray'>
                <h3 className='text-xl text-white font-bold'>About</h3>
                <p className='text-sm leading-4'>An landing page of Twenty one Pilots that shows deeper one of the best bands in the 10s. An landing page of Twenty one Pilots that shows deeper one of the best bands in the 10s.An landing page of Twenty one Pilots that shows deeper one of the best bands in the 10s.</p>
            </div>

            <div className="flex gap-3 text-sm">
                <TextIcon text='React' icon={<FaReact className='text-blue-500' />} wrap='col' />
                <TextIcon text='Bootsrap' icon={<FaReact />} wrap='col' />
                <TextIcon text='Typescript' icon={<FaReact />} wrap='col' />
                <TextIcon text='Tailwind' icon={<FaReact />} wrap='col' />
            </div>

            <div className="flex justify-center gap-3 p-3  mx-auto text-mainGray ">
                <Link className='flex gap-3 items-center  rounded-md px-2 py-1 hover:text-mainPurple hover:bg-white font-semibold bg-mainPurple text-white   transition-colors' href="/details:id">
                    <p>GitHub</p>
                    <AiOutlineArrowRight />
                </Link>
                <Link className='flex gap-3 items-center  rounded-md px-2 py-1 hover:text-mainPurple hover:bg-white font-semibold bg-mainPurple text-white  transition-colors' href="/details:id">
                    <p>More</p>
                    <AiOutlineArrowRight />

                </Link>
            </div>
        </motion.div >
    )
}

export default ProjectCard