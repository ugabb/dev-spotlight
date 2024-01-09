import React from 'react'
import Logo from './Logo'

import Image from 'next/image';

import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='flex flex-col lg:flex-row gap-20 justify-center h-[160px]  w-full bg-gradient-to-t from-mainPurple to-mainPurple/5  backdrop-blur-sm px-20 py-5 '>
            <section className='flex flex-col'>
                <Image src={"/title.png"} className='pt-3' alt='Logo DevSpotligth' width={123} height={24} />
                <div className="flex gap-3">
                    <div>
                        <h4 className='text-sm text-mainGray'>Created by: <span className='text-mainPurple'>Gabriel Barros</span></h4>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href={'https://www.linkedin.com/in/ugab/'} target='_blank'>
                        <FaLinkedin className='text-lg hover:text-mainPurple hover:scale-110 transition-all ease-in-out' />
                    </Link>
                    <Link href={'https://github.com/ugabb/'} target='_blank'>
                        <FaGithub className='text-lg hover:text-mainPurple hover:scale-110 transition-all ease-in-out' />
                    </Link>
                    <Link href={'https://twitter.com/uGabDev'} target='_blank'>
                        <FaXTwitter className='text-lg hover:text-mainPurple hover:scale-110 transition-all ease-in-out' />
                    </Link>
                </div>
            </section>
            <section className="flex flex-col text-mainGray">
                <Link href={'/'} className='hover:text-white hover:underline hover:decoration-mainPurple'>Home</Link>
                <Link href={'/projects'} className='hover:text-white hover:underline hover:decoration-mainPurple'>Projects</Link>
                <Link href={'sign-up'} className='hover:text-white hover:underline hover:decoration-mainPurple'>Sign Up</Link>
            </section>
        </footer>
    )
}

export default Footer