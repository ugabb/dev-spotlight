import React from 'react'

type Props = {
    text: string,
    type: "button" | "submit" | "reset"
}

const GlowButton = ({ text, type }: Props) => {
    return (
        <button type={type} className="w-[172px] mx-auto h-[43px] px-4 py-[5px] text-mainPurple font-thin hover:text-white transition-all ease-in-out hover:bg-mainPurple bg-transparent shadow-md hover:shadow-xl shadow-purple-500/50 hover:shadow-purple-500/50  rounded-[5px] justify-center items-center gap-2 inline-flex">{text}</button>
    )
}

export default GlowButton