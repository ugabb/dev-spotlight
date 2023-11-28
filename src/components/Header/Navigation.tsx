import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MenuItem } from "./MenuItem";
// import { MenuItem } from "./MenuItem";

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

export const Navigation = ({ isOpen }) => (
    <motion.ul variants={variants} className={`z-50 ml-10 ${isOpen ? "block" : "hidden"} flex flex-col gap-3 pt-10 `}>
        {routes.map(route => (
            <MenuItem name={route.name} route={route.route} key={route.id} />
        ))}
    </motion.ul>
);

const routes = [
    { id: 0, name: "Home", route: "/" },
    { id: 1, name: "Login", route: "/login" },
    { id: 3, name: "Sign Up", route: "/sign-up" }
]