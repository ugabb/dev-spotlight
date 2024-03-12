import Header from '@/components/Header/Header';
import { PiCircleNotchLight } from "react-icons/pi";
import React, { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';
import { getSession, signIn } from 'next-auth/react';
import getCurrentUser from '@/actions/getCurrentUser';
import toast from 'react-hot-toast';

interface SignUpProps {
    currentUser: any;
    session: any
}

const SignIn = ({ currentUser, session }: SignUpProps) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signIn("github");
            if (result?.ok) {
                toast.custom(<div className='w-40 h-20 bg-mainPurple rounded-lg shadow'>
                    <h1 className='text-white text2xl'>Welcome!</h1>
                </div>);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to sign in!");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <span><PiCircleNotchLight size={50} className='text-mainPurple animate-spin' /></span>;
    }



    return (
        <div className="flex flex-col justify-center bg-black">
            <Header />
            <div className="flex flex-col-reverse md:flex-row gap-3 ">
                <div className="hidden md:flex justify-center items-center md:w-1/2 h-screen bg-black relative overflow-hidden">
                    <h1 className='text-6xl font-georgeTown font-bold  text-center z-10 uppercase tracking-widest glow-text backdrop-blur-sm w-full p-5 border-y border-zinc-500 '>Share</h1>
                    <Image className="object-cover h-screen w-full brightness-50 absolute top-0" src={'/github-cyberpunk.jfif'} width={1024} height={1024} alt='Github logo cyberpunk by Ai' />
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-r from-transparent to-black z-20"></div>
                </div>
                <div className="w-full h-screen md:w-1/2 flex flex-col justify-center items-center">
                    <div className='w-[300px] h-[300px]  md:w-[350px] md:h-[350px]  lg:w-[400px] lg:h-[400px]  xl:w-[600px] xl:h-[600px]  flex flex-col justify-center items-center bg-black  border-transparent hover:border-white delay-75 hover:rounded-full transition-all'>
                        <p className="uppercase tracking-widest text-2xl md:text-3xl xl:text-4xl font-georgeTown text-center">Connect with GitHub</p>

                        <div className="relative">
                            {/* <Link href={'http://localhost:8080/oauth2/authorization/github'}>
                                <AiFillGithub size={200} className="cursor-pointer z-10 transition-all ease-in-out hover:scale-105 hover:shadow-md hover:shadow-mainPurple rounded-full " />
                            </Link> */}
                            <AiFillGithub onClick={handleSignIn} size={200} className="cursor-pointer z-10 transition-all ease-in-out hover:scale-105 hover:shadow-md hover:shadow-mainPurple rounded-full " />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;



// export const getServerSideProps = async () => {
//     const session = await getSession();
//     console.log(session);
//     const currentUser = await getCurrentUser();
//     console.log(currentUser);

//     return {
//         props: {
//             session,
//             currentUser,
//         },
//     };
// };