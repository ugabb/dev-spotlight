import React from 'react'
import TextIcon from './TextIcon'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {}

const ProjectCard = (props: Props) => {
    return (
        <motion.div

            className='flex flex-col gap-3 backdrop-blur-sm  border rounded-[27px] w-[300px] md:w-[350px] h-[250px] p-2'>
            <div className='flex gap-3 items-center'>
                <div className='flex w-10 h-10'>
                    <Image className='rounded-full object-cover' src={"/pc.png"} width={40} height={40} alt='profile picture' />
                </div>
                <h2 className='text-xl font-bold'>Twenty One Pilots</h2>
            </div>

            <div className="flex flex-col ">
                <p className='text-sm text-mainGray'>An landing page of Twenty one Pilots that shows deeper one of the best bands in the 10s</p>
                <div className='flex justify-center  w-full h-20'>
                    <Image className='object-cover rounded-md' src={"/pc.png"} width={250} height={40} alt='profile picture' />
                </div>
            </div>

            <div className="flex justify-center gap-3">
                <Link className='border rounded-md px-1' href="/details:id"><TextIcon text='GitHub' icon={<AiOutlineArrowRight className='text-mainPurple' />} /></Link>
                <Link className='border rounded-md px-1' href="/details:id"><TextIcon text='Know More' icon={<AiOutlineArrowRight className='text-mainPurple' />} /></Link>
            </div>
        </motion.div>
    )
}

export default ProjectCard