import { IProjectToCreate } from '@/interfaces/IProject';
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
    label: string,
    registerName: string,
    register: UseFormRegister<FieldValues>,
    validationRules?: Object,
    errors?: FieldErrors<IProjectToCreate>;
}


const InputDefault = ({ label, registerName, register, validationRules = {}, errors,...props }: Props) => {
    return (
        <label className='flex flex-col text-mainGray italic '>
            {label}:
            <input
                type="text"
                {...register(registerName, validationRules)}
                {...props}
                className={`w-full bg-black rounded-md px-3 py-2 border  hover:border-mainPurple focus:outline-none focus:border-mainPurple
                ${errors?.[registerName] ? 'border-red-500' : 'border-zinc-700'}`}
            />
            {errors && (
                <span className="text-red-500 text-xs">
                    {errors[registerName]?.message}
                </span>
            )}
        </label>
    )
}

export default InputDefault
