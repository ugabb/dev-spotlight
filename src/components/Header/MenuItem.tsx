import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

export const MenuItem = ({ route, name }) => {
    return (
        <motion.li
            className="cursor-pointer"
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link href={route} className='hover:text-white hover:underline hover:decoration-mainPurple transition-all cursor-pointer hover:scale-105'>{name}</Link>
        </motion.li>
    );
};
