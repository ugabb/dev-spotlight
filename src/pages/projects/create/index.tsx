import Header from '@/components/Header/Header'
import InputDefault from '@/components/inputs/InputDefault'
import Select from '@/components/inputs/Select'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'


interface IProject {
    name: string;
    repoLink: string;
    description: string;
    technologies: ITechnologies[];
}

interface ITechnologies {
    name: string;
}

type Props = {}

const index = (props: Props) => {
    const [project, setProject] = useState<IProject>();
    const [icons, setIcons] = useState([]);
    const [selectTechnologies, setSelectedTechnologies] = useState<any[]>([]);
    const [filter, setFilter] = useState('');
    const [suggestedIcons, setSuggestedIcons] = useState([]);

    const { register, handleSubmit, control } = useForm();

    const fetchIcons = async () => {
        try {
            const response = await fetch('https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.json');
            const data = await response.json();
            setIcons(data)
        } catch (error) {
            console.log(error)
        }
    }


    const handleInputChange = (value) => {
        setFilter(value);
        // Update the suggested icons based on the current input value
        setSuggestedIcons(icons.filter((icon) =>
            icon.name.toLowerCase().includes(value.toLowerCase())
        ));
    };

    useEffect(() => {
        fetchIcons()
    }, [])
    useEffect(() => {
        // console.log(project)
        console.log(selectTechnologies)
        console.log(icons)
    }, [project, selectTechnologies])



    const onSubmit: SubmitHandler<IProject> = (data) => {

        setSelectedTechnologies((prev) => [...prev, data.technologies])
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
                    <div>
                        <Controller
                            name='technologies' // This should match the name in your form data
                            control={control}
                            defaultValue='' // Set the default value, if any
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    className='w-full bg-white rounded-md'
                                    disablePortal
                                    id='combo-box-demo'
                                    options={icons?.map((icon) => icon.name)}
                                    sx={{ width: 300 }}
                                    onChange={(event, value) => field.onChange(value)}
                                    renderInput={(params) => <TextField {...params} fullWidth label='Icons' />}
                                />
                            )}
                        />


                    </div>
                    <button type="submit">Enviar</button>
                </form>
                {
                    selectTechnologies && (
                        <div>
                            {selectTechnologies.map((tech) => {
                                console.log({ tech })
                                return (
                                    (
                                        <div>
                                            <div className='flex gap-3 items-center text-mainGray'>
                                                <i className={`devicon-${tech}-original colored`}></i>a
                                                <p>{tech}</p>
                                            </div>
                                            <div className='flex gap-3 items-center text-mainGray'>
                                                <i className={`devicon-${tech}-plain colored`}></i>b
                                            </div>
                                        </div>
                                    )
                                )
                            })}
                        </div>
                    )
                }

            </div >
        </div >
    )
}

export default index