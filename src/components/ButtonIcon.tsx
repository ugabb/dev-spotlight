import React from 'react'

import { RxExternalLink } from "react-icons/rx";
import TextIcon from '@/components/TextIcon';

type Props = {
  text: string;
  textColor: string;
  textSize: string;
  icon?: React.ReactNode;
}
const ButtonIcon = ({ icon, text, textColor, textSize, ...props }: Props) => {
  return (
    <button {...props} type='button' className='flex gap-1 items-center px-3 py-1 rounded-md w-auto'>
      <p className={`text-${textColor} hover:text-white transition-colors text-${textSize}`}>{text}</p>
      {icon}
    </button>
  )
}

export default ButtonIcon