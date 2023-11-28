import React from 'react'

type Props = {
  text: string;
  icon: React.ReactNode;
}

const TextIcon = ({ text, icon }: Props) => {
  return (
    <div className='flex gap-1 items-center'>
      <p className='text-mainGray'>{text}</p>
      {icon}

    </div>
  )
}

export default TextIcon