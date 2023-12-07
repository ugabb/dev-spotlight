import Header from '@/components/Header/Header'
import InputDefault from '@/components/InputDefault'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {}

const index = (props: Props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data)
    }
    return (
        <div className='md:my-24'>
            <Header />
            <div className='mx-auto space-y-5 w-full p-3  md:px-40'>
                <h1 className='text-2xl font-bold text-mainGray text-center tracking-widest uppercase font-georgeTown break-all'>Create Project</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-5'>
                        <InputDefault register={register} label='Name' registerName='name' />
                    </div>
                    <div></div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default index