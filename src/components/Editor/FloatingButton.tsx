import Image from 'next/image';
import React, { ComponentProps } from 'react'



export interface FloatingButtonProps extends ComponentProps<'button'> {
    icon?: React.ElementType;
    title: string;
    subtitle: string;
    handleToggle: () => void
}

const FloatingButton = ({ title, subtitle, icon: Icon, handleToggle }: FloatingButtonProps) => {
    console.log(Icon)
    return (
        <button type={"button"} onClick={handleToggle} className='flex items-center gap-2 p-1 rounded min-w-[280px] group hover:bg-mainPurple/80'>
            {Icon && <Icon className="text-3xl" />}
            <div className='flex flex-col text-left'>
                <span className='text-sm group-hover:text-white'>{title}</span>
                <span className='text-sm text-zinc-400 group-hover:text-zinc-200'>{subtitle}</span>
            </div>
        </button>
    )
}

export default FloatingButton