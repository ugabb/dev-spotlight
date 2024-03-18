import React, { ComponentProps } from 'react'

export interface BubbleButtonProps extends ComponentProps<'button'>{}

const BubbleButton = ({...props}: BubbleButtonProps) => {
    return (
        <button className='p-2 text-sm text-zinc-200 hover:text-zinc-50 rounded-lg  bg-transparent hover:bg-mainPurple data-[active=true]:bg-mainPurple' {...props}/>
    )
}

export default BubbleButton