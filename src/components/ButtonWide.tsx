import React from 'react'

type Props = {
    text: string;
    icon: React.ReactNode;
}

const ButtonWide = ({ text, icon }: Props) => {
    return (
        <div className='flex justify-center items-center gap-3 rounded-xl bg-[#1e1d1f] hover:border-2 hover:border-mainPurple h-[140px] md:w-[250px] xl:w-[350px]'>
            <p className='text-lg text-mainGray hover:text-white '>{text}</p>
            {icon}
        </div>
    )
}

export default ButtonWide