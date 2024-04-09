import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
// import { MenuItem } from "./MenuItem";

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

interface NavigationProps {
    isOpen: boolean;
    sessionStatus: string;
    userImage: string;
}

export const Navigation = ({ isOpen, sessionStatus, userImage }: NavigationProps) => (
    <motion.ul variants={variants} className={`z-50 absolute top-2 left-10 ${isOpen ? "block" : "hidden"} flex flex-col gap-3 pt-10 `}>
       {userImage && <Image className='rounded-full hover:scale-105 cursor-pointer' src={userImage} height={50} width={50} alt='user profile photo' />}
        
        {routes.map(route => {
            if (sessionStatus !== "authenticated") {
                if (route.id === 2) return null;
            }

            if (sessionStatus === "authenticated") {
                route.name = route.name === "Sign In" ? "Sign Out" : route.name;
            }
            return (
                <MenuItem name={route.name} route={route.route} key={route.id} />
            )
        })}
    </motion.ul>
);

const routes = [
    { id: 0, name: "Home", route: "/" },
    { id: 1, name: "Projects", route: "/projects" },
    { id: 2, name: "Create Project", route: "/projects/create" },
    { id: 3, name: "Sign In", route: "/sign-up" }
]