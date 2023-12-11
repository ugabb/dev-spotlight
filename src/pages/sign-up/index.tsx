import Header from '@/components/Header/Header';
import Link from 'next/link';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';
import { signIn } from 'next-auth/react';

const SignIn = () => {


    const handleSignIn = async () => {
        try {
            const response = await fetch('http://localhost:8080/oauth2/authorization/github');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };


    const word = ['Share', "Build"]

    return (
        <div className="flex flex-col justify-center bg-black">
            <Header />
            <div className="flex flex-col-reverse md:flex-row gap-3 ">
                <div className="hidden md:flex justify-center items-center md:w-1/2 h-screen bg-black relative overflow-hidden">
                    <h1 className='text-6xl font-georgeTown font-bold  text-center z-10 uppercase tracking-widest glow-text backdrop-blur-sm w-full p-5 border-y border-zinc-500 '>Share</h1>
                    <Image className="object-cover h-screen w-full brightness-50 absolute top-0" src={'/github-cyberpunk.jfif'} width={1024} height={1024} />
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-r from-transparent to-black z-20"></div>
                </div>
                <div className="w-full h-screen md:w-1/2 flex flex-col justify-center items-center">
                    <div className='w-[300px] h-[300px]  md:w-[350px] md:h-[350px]  lg:w-[400px] lg:h-[400px]  xl:w-[600px] xl:h-[600px]  flex flex-col justify-center items-center bg-black  border-transparent hover:border-white delay-75 hover:rounded-full transition-all'>
                        <p className="uppercase tracking-widest text-2xl md:text-3xl xl:text-4xl font-georgeTown text-center">Connect with GitHub</p>

                        <div className="relative">
                            {/* <Link href={'http://localhost:8080/oauth2/authorization/github'}>
                                <AiFillGithub size={200} className="cursor-pointer z-10 transition-all ease-in-out hover:scale-105 hover:shadow-md hover:shadow-mainPurple rounded-full " />
                            </Link> */}
                            <AiFillGithub onClick={() => signIn()} size={200} className="cursor-pointer z-10 transition-all ease-in-out hover:scale-105 hover:shadow-md hover:shadow-mainPurple rounded-full " />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
