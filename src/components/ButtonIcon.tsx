import React from 'react'

import { RxExternalLink } from "react-icons/rx";
import TextIcon from '@/components/TextIcon';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  textColor: string;
  textSize: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
const ButtonIcon = ({ icon, text, textColor, textSize, ...props }: Props) => {
  return (
    <button type='button'  className='flex gap-1 items-center px-3 py-1 rounded-md w-auto' {...props}>
      <p className={`text-${textColor} hover:text-white transition-colors text-${textSize}`}>{text}</p>
      {icon}
    </button>
  )
}

export default ButtonIcon