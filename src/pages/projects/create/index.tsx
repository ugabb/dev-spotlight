import Header from '@/components/Header/Header'
import InputDefault from '@/components/inputs/InputDefault'
import Select from '@/components/inputs/Select'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'
import GlowButton from '@/components/GlowButton'
import useSelectImage from '@/hooks/useSelectImage'
import Image from 'next/image'


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


    const onSubmit: SubmitHandler<IProject> = (data) => {

        setSelectedTechnologies((prev) => [...prev, data.technologies])
    }

    // image input
    const [imagesSelected, setImagesSelected] = useState<File[]>([]);
    const { uploader, result } = useSelectImage()

    useEffect(() => {
        uploader(imagesSelected);
    }, [imagesSelected])

    useEffect(() => {
        // console.log(project)
        // console.log(selectTechnologies)
        // console.log(icons)
        // console.log(imagesSelected)
        console.log(result)
    }, [project, selectTechnologies, imagesSelected,result])



    return (
        <div className='md:my-24'>
            <Header />
            <div className='mx-auto space-y-5 w-full p-3  md:px-40'>
                <h1 className='text-2xl font-bold text-mainGray text-center tracking-widest uppercase font-georgeTown break-all'>Create Project</h1>

                <form className='xl:max-w-3xl mx-auto flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className='flex flex-col gap-5 lg:w-1/2 '>
                            <InputDefault register={register} label='Name' registerName='name' />
                            <InputDefault register={register} label='Repository Link' registerName='repoLink' />
                        </div>

                        <div className='lg:w-1/2 '>
                            <label className='flex flex-col text-mainGray italic '>
                                Technologies
                                <Controller
                                    name='technologies' // This should match the name in your form data
                                    control={control}
                                    defaultValue='' // Set the default value, if any
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            className='w-full bg-black rounded-md text-white focus:outline-none'
                                            style={{ color: "#fff" }}
                                            disablePortal

                                            id='combo-box-demo'
                                            options={icons?.map((icon) => icon.name)}
                                            sx={{
                                                width: 300,
                                                '& .MuiAutocomplete-input': {
                                                    color: "#B9B9B9",
                                                    "&:focus": {
                                                        outline: 'none'
                                                    }
                                                },
                                            }}

                                            onChange={(event, value) => field.onChange(value)}
                                            renderInput={(params) => <TextField {...params} fullWidth className='text-white  focus:outline-0' sx={{
                                                '& .MuiTextField': {
                                                    outline: 'none'
                                                }
                                            }} />}
                                        />
                                    )}
                                />

                            </label>

                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <InputDefault register={register} label='Description' registerName='description' />
                    </div>
                    <div className="flex flex-col md:flex-row flex-wrap  items-center gap-3">
                        {result.length < 5
                            ?
                            <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                    const selectedFiles = Array.from(e.target.files);
                                    setImagesSelected((prev) => [...prev, ...selectedFiles]);

                                }}
                                className='md:w-1/3 h-full'
                            />
                            :
                            <div className="flex flex-col gap-2 ">
                                <p className='text-xs text-red-500'>Max of 5 images</p>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const selectedFiles = Array.from(e.target.files);
                                        setImagesSelected((prev) => [...prev, ...selectedFiles]);

                                    }}
                                    disabled
                                    max={5}
                                    className='md:w-1/3 h-full'
                                />
                            </div>
                        }

                        {result && result.map((img, index) => (
                            <div key={index} className='flex flex-col md:flex-grid md:grid-cols-3 flex-wrap items-center gap-3'>
                                <Image className='w-[150px] h-[100px] object-cover' src={img} alt={`Image ${index + 1}`} width={1920} height={1080} />
                            </div>
                        ))}
                    </div>

                    <GlowButton text='Create' type='submit' />
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