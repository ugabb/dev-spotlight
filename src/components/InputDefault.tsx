import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
    label: string,
    registerName: string,
    register: UseFormRegister<FieldValues>
}

const InputDefault = ({ label, registerName, register, ...props }: Props) => {
    return (
        <label className='flex flex-col text-mainGray italic '>
            {label}:
            <input type="text" {...register(label)} {...props} className='w-full bg-black rounded-md px-3 py-2 border border-zinc-700 hover:border-mainPurple' />
        </label>
    )
}

export default InputDefault
