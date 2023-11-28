import Header from '@/components/Header/Header'
import Link from 'next/link'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'

const SignUp = () => {
    return (
        <div className='flex flex-col justify-center'>
            <Header />
            <div className='h-screen flex flex-col justify-center items-center'>
                <div className='relative mb-10'>
                    <h1 className=' text-3xl font-bold text tracking-widest uppercase'>Login</h1>
                    <h1 className='absolute top-2 text-3xl font-bold text tracking-widest uppercase blur-sm animate-pulse'>Login</h1>
                </div>
                <p className='uppercase tracking-widest'>Connect with GitHub</p>
                <div className="relative">
                    <Link href={"/github"}>
                        <AiFillGithub className='text-6xl cursor-pointer z-10 transition-all ease-in-out hover:text-mainPurple hover:scale-105 shadow-md shadow-white/50 rounded-full' />
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default SignUp