import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon: React.ReactNode;
}

const ButtonWide = ({ text, icon, ...props }: Props) => {
    return (
        <button className='flex justify-center items-center gap-3 rounded-xl bg-[#1e1d1f] hover:border-2 hover:border-mainPurple h-[140px] md:w-[250px] xl:w-[350px] ' {...props}>
            <p className='text-lg text-mainGray hover:text-white '>{text}</p>
            {icon}
        </button>
    )
}

export default ButtonWide