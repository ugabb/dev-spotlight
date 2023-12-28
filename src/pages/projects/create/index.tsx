import Header from '@/components/Header/Header'
import InputDefault from '@/components/inputs/InputDefault'
import Select from '@/components/inputs/Select'
import React, { ReactElement, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

//uuid
import { v4 } from 'uuid'

import GlowButton from '@/components/GlowButton'
import useSelectImage from '@/hooks/useSelectImage'
import Image from 'next/image'

// firebase
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '@/firebase'
import ButtonIcon from '@/components/ButtonIcon'
import { GoLinkExternal } from 'react-icons/go'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { IoShareSocialOutline } from 'react-icons/io5'
import useUploadImages from '@/hooks/useUploadImage'

interface IProject {
    name: string;
    repoLink: string;
    description: string;
    technologies: ITechnologies[];
}

interface ITechnologies {
    name: string;
    color: string;
}

type Props = {}

const index = (props: Props) => {
    const [project, setProject] = useState<IProject>();
    const [icons, setIcons] = useState([]);
    const [selectTechnologies, setSelectedTechnologies] = useState<ITechnologies[]>([]);
    const [filter, setFilter] = useState('');
    const [suggestedIcons, setSuggestedIcons] = useState([]);


    const { register, handleSubmit, control } = useForm();

    // fetch repositories
    const [repositories, setRepositories] = useState([]); // [
    const [selectedRepository, setSelectedRepository] = useState(); // [
    const { data: session } = useSession()
    const user = session?.user?.username

    const handleFetchRepositories = async (page = 1) => {
        try {
            const response = await fetch(`https://api.github.com/users/${user}/repos?page=${page}&per_page=100`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setRepositories((prevRepos) => [...prevRepos, ...data]);
                    handleFetchRepositories(page + 1); // Fetch next page
                }
            } else {
                console.error('Failed to fetch repositories:', response.status);
            }
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    const handleSelectedRepository = (e) => {
        const selectedRepoName = e.target.value;
        const selectedRepo = repositories.find((repo) => repo.name == selectedRepoName);
        setSelectedRepository(selectedRepo)
    }

    const handleAddTech = (e: ReactElement) => {
        const tech = e.target.value
        const selectedTech = icons.find((icon) => icon.name === tech);
        setSelectedTechnologies(prev => [...prev, {
            name: selectedTech?.name,
            color: selectedTech?.color
        }])
        e.target.value = ""
    }

    // useEffect(() => {
    //     console.log(repositories)
    //     console.log(selectedRepository)
    // }, [repositories, selectedRepository])


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

    const { uploadImagesToFirebase } = useUploadImages();

    const onSubmit: SubmitHandler<IProject> = async (data) => {
        // setSelectedTechnologies((prev) => [...prev, data.technologies])
        const imagesToUpload = await uploadImagesToFirebase(imagesSelected);
        console.log({ imagesToUpload })
        //    saveImages(imagesToUpload);
    }

    // image input
    const [imagesSelected, setImagesSelected] = useState<File[]>([]);
    const { selectImageLocally, result } = useSelectImage()

    useEffect(() => {
        selectImageLocally(imagesSelected);
    }, [imagesSelected])

    useEffect(() => {
        // console.log(project)
        // console.log(selectTechnologies)
        console.log(icons)
        // console.log({ imagesSelected })
        // console.log({ result })
    }, [project, selectTechnologies, imagesSelected, result, icons])



    return (
        <div className='md:my-24'>
            <Header />
            <div className='mx-auto space-y-5 w-full p-3  md:px-40'>
                <h1 className='text-2xl font-bold text-mainGray text-center tracking-widest uppercase font-georgeTown break-all'>Create Project</h1>

                <div className="flex flex-col">
                    <button onClick={(e) => handleFetchRepositories(e)} type="button" className='px-3 py-1 text-mainGray hover:text-mainPurple flex items-center'>
                        Seach in your Repositories
                        <GoLinkExternal className='text-mainPurple' />
                    </button>
                    {repositories.length > 0 && (
                        <select onChange={handleSelectedRepository} className='w-full bg-black rounded-md px-3 py-2 border border-zinc-700 hover:border-mainPurple focus:outline-none focus:border-mainPurple'>
                            {/* <option>TESTE</option> */}
                            {repositories && repositories.map((repo, i) => (
                                <option value={repo.name} key={repo.id}>{i} - {repo.name}</option>
                            ))}
                        </select>
                    )}

                </div>

                <form className='xl:max-w-3xl mx-auto flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className='flex flex-col gap-5 lg:w-1/2 '>
                            <InputDefault register={register} label='Name' registerName='name' value={selectedRepository?.name} />
                            <InputDefault register={register} label='Repository Link' registerName='repoLink' value={selectedRepository?.html_url} />
                        </div>

                        <div className='flex flex-col gap-5 lg:w-1/2 '>
                            <InputDefault register={register} label='Technologies' registerName='technologies' placeholder="Press Space to add" onKeyDown={(e) => handleAddTech(e)} />
                            <select onChange={handleAddTech} className='w-full bg-black rounded-md px-3 py-3 text-mainGray border border-zinc-700 hover:border-mainPurple focus:outline-none focus:border-mainPurple'>
                                <option value="test">Test</option>
                                {
                                    icons.map(icon => (
                                        <option key={icon?.name} value={icon?.name}>{icon?.name}</option>
                                    ))
                                }
                            </select>

                            {
                                selectTechnologies && (
                                    <div className='flex gap-2 flex-wrap'>
                                        {selectTechnologies.map((tech, i) => {
                                            return (
                                                (
                                                    <div key={i} className='flex'>
                                                        <p className={`text-white px-3 py-1 rounded-md `} style={{ backgroundColor: tech.color }}>{tech.name}</p>
                                                    </div>
                                                )
                                            )
                                        })}
                                    </div>
                                )
                            }
                        </div>


                        {/* <div className='lg:w-1/2 '>
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

                        </div> */}
                    </div>

                    <div className="flex flex-col gap-3">
                        <InputDefault register={register} label='Description' registerName='description' value={selectedRepository?.description} />
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
                                className="text-sm text-mainGray
                                file:mr-5 file:py-2 file:px-5 file:border file:border-mainPurple file:outline-none file:rounded-md
                                file:text-sm file:bg-transparent file:text-mainPurple
                                hover:file:cursor-pointer hover:file:bg-mainPurple
                                hover:file:text-white file:transition-all file:ease-in-out"                            />
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
                    <div className="grid grid-cols-2 md:hidden items-start md:flex gap-1">
                        <Link href={''}>
                            <ButtonIcon icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Live Demo' textColor='mainGray' textSize='sm' />
                        </Link>
                        <Link href={'/'}>
                            <ButtonIcon icon={<Image src={'/external-link.svg'} width={15} height={15} alt='icon' />} text='Repository' textColor='mainGray' textSize='sm' />
                        </Link>
                        <Link href={'/'}>
                            <ButtonIcon icon={<Image src={'/copy-icon.svg'} width={15} height={15} alt='icon' />} text='Clone Project' textColor='mainGray' textSize='sm' />
                        </Link>
                        <Link href={'/'}>
                            <ButtonIcon icon={<IoShareSocialOutline size={15} className='text-mainPurple' />} text='Share' textColor='mainGray' textSize='sm' />
                        </Link>
                    </div>

                    <GlowButton text='Create' type='submit' />
                </form>

            </div >
        </div >
    )
}

export default index