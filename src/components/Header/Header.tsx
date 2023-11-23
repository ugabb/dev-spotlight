import Image from 'next/image'
import React, { useRef } from 'react'
import { motion, sync, useCycle } from "framer-motion";

import { AiOutlineMenu } from 'react-icons/ai'
import { useDimensions } from './useDimensions';
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';


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
    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className='flex justify-between'>

            <Navigation isOpen={isOpen} />
            <motion.div variants={sidebar} className={`background ${isOpen ? "block" : "hidden"} `} />

            <Image src={"/title.png"} alt='Logo DevSpotligth' width={123} height={24} />
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
    )
}

export default Header