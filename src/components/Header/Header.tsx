import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { motion, sync, useCycle } from "framer-motion";

import { AiOutlineMenu } from 'react-icons/ai'
import { useDimensions } from './useDimensions';
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';
import Link from 'next/link';


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
    const [isOpen, toggleOpen] = useCycle(false, true);
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
            toggleOpen()
        }
    }, [screenWidth])

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className='flex justify-between items-center md:w-full md:h-20 md:backdrop-blur-sm md:bg-black/20 md:fixed md:top-0 md:left-0 md:mx-auto px-3 md:px-20 z-20'>

            <motion.div variants={sidebar} className={`background relative ${isOpen ? "block" : "hidden"} z-20 opacity-80 rounded-sm`}>
                <Navigation isOpen={isOpen} />
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className='cursor-pointer '>
                <Link href={"/"}>
                    <Image src={"/title.png"} className='pt-3' alt='Logo DevSpotligth' width={123} height={24} />
                </Link>
            </motion.div>
            <MenuToggle toggle={() => toggleOpen()} />

            <motion.ul className="hidden md:flex gap-3 text-mainGray ">
                <Link href={'/'} className='hover:text-white hover:underline hover:decoration-mainPurple transition-all cursor-pointer hover:scale-105'>Home</Link>
                <Link href={'/projects'} className='hover:text-white hover:underline hover:decoration-mainPurple transition-all cursor-pointer hover:scale-105'>Projects</Link>
                <Link href={'/docs'} className='hover:text-white hover:underline hover:decoration-mainPurple transition-all cursor-pointer hover:scale-105'>Docs</Link>
                <Link href={'/sign-up'} className=' hover:text-mainPurple hover:underline hover:decoration-mainPurple transition-all font-semibold hover:glow-text cursor-pointer hover:scale-105'>Sign Up</Link>
            </motion.ul>

        </motion.nav>
    )
}

export default Header