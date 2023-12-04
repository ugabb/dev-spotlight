import React from 'react'

type Props = {
  text: string;
  textColor: string;
  icon: React.ReactNode;
  wrap: string
}

const TextIcon = ({ text, icon, wrap, textColor }: Props) => {
  return (
    <div className={`flex ${wrap == "col" ? "flex-col-reverse" : ""} gap-1 items-center `}>
      <p className={`text-${textColor}`}>{text}</p>
      {icon}
    </div>
  )
}

export default TextIcon