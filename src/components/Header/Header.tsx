import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useCycle } from "framer-motion";

import { AiOutlineMenu } from 'react-icons/ai'
import { PiCaretDown } from 'react-icons/pi'
import { useDimensions } from './useDimensions';
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';

// // shadcn dropdown
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";

const sidebar = {
    open: (width = 1000) => ({
        clipPath: `circle(${width * 2 + 200}px at calc(100% - 40px) 40px)`, // Update clip path to open right to left
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at calc(100% - 40px) 40px)", // Update closed clip path
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};
const Header = () => {
    const { data: session, status } = useSession();
    // // const sessao = await getSession()
    // // const providers = await getProviders()
    // if (session) {
    //     console.log("USERDATA:", session.user); // This will log the username
    // }

    const [isOpen, toggleOpen] = useCycle(false, true);
    // Wrap toggleOpen in useCallback to memoize it
    const memoizedToggleOpen = useCallback(() => {
        toggleOpen();
    }, [toggleOpen]);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Initial call to set the screenWidth
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    useEffect(() => {
        if (screenWidth >= 768 && isOpen) {
            memoizedToggleOpen();
        }
    }, [screenWidth, isOpen, memoizedToggleOpen])

    return (
        <motion.nav
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0.7 }}
            // initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className='flex justify-between items-center md:w-full md:h-20 md:backdrop-blur-sm md:bg-black/20 md:fixed md:top-0 md:left-0 md:mx-auto px-3 md:px-40 z-40 shadow-sm shadow-mainPurple/40'>

            <motion.div variants={sidebar} className={`background bg-gradient-to-b from-purple-600 via-mainPurple to-purple-400 relative ${isOpen ? "block" : "hidden"} z-[60]  rounded-sm`}>
                <Navigation sessionStatus={status} isOpen={isOpen} userImage={session?.user.image}/>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className='cursor-pointer '>
                <Link href={"/"}>
                    <Image src={"/title.png"} className='pt-3' alt='Logo DevSpotligth' width={123} height={24} />
                </Link>
            </motion.div>
            <MenuToggle toggle={() => toggleOpen()} />

            <motion.ul className="hidden md:flex md:items-center gap-5 text-mainGray ">
                <Link href={'/'} className='hover:text-white hover:underline hover:decoration-mainPurple transition-all cursor-pointer hover:scale-105'>Home</Link>
                <Link href={'/projects'} className='hover:text-white hover:underline hover:decoration-mainPurple transition-all cursor-pointer hover:scale-105'>Projects</Link>
                {status === "authenticated" &&
                    <Link href={'/projects/create'} className='hover:text-white hover:underline hover:decoration-mainPurple transition-all cursor-pointer hover:scale-105'>Create Project</Link>
                }


                {session?.user.image ?
                    <Dropdown className='bg-zinc-950 border border-mainPurple/50 mt-2'>
                        <DropdownTrigger>
                            <div className='flex gap-3 items-center '>
                                <div className="flex flex-col items-center relative">
                                    <Image className='rounded-full hover:scale-105 cursor-pointer' src={session?.user.image} height={30} width={30} alt='user profile photo' />
                                    <PiCaretDown className='absolute -bottom-4 cursor-pointer' />
                                </div>
                                <p className='text-sm cursor-pointer hover:text-white hover:underline hover:decoration-mainPurple transition-all'>{session?.user.name}</p>
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
                            <DropdownItem variant='flat' key="settings"><Link href={"/profile-settings"}>Profile Settings</Link></DropdownItem>
                            <DropdownItem variant='flat' key="sign-out" onClick={() => signOut()} >Sign Out</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    :
                    <Link className='hover:text-white hover:underline hover:decoration-mainPurple transition-all cursor-pointer hover:scale-105' href={"/sign-up"}>Sign Up</Link>

                }


            </motion.ul>

        </motion.nav>
    )
}

export default Header