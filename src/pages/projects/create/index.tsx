"use client"

import Header from '@/components/Header/Header'
import InputDefault from '@/components/inputs/InputDefault'
import React, { ReactElement, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'


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

import { GoPlusCircle } from "react-icons/go";
import { IoShareSocialOutline } from 'react-icons/io5'
import useUploadImages from '@/hooks/useUploadImage'
import { IUser } from '@/interfaces/IUser'
import { useRouter } from 'next/router'

import { IProjectToCreate, ITechnologies } from '@/interfaces/IProject'
import DialogComponent from '@/components/Dialog'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { User } from '@prisma/client'
import toast from 'react-hot-toast'
import Footer from '@/components/Footer';

import Loading from '@/components/Loading';

// Editor
import ReactEditor from '@/components/Editor/ReactEditor';


type Props = {}

interface ProjectImages {
    url: string[]
}

const Index = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [icons, setIcons] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState<ITechnologies[]>([]);
    const [filter, setFilter] = useState('');
    const [suggestedIcons, setSuggestedIcons] = useState([]);

    const { register, handleSubmit, formState: { errors }, setError, setValue, getValues } = useForm<IProjectToCreate>();

    // dialog
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [loadingDialog, setLoadingDialog] = useState<boolean>(false);

    const handleOpenDialog = () => setOpenDialog(dialog => !dialog);
    const handleLoadingDialog = () => setLoadingDialog(loading => !loading);


    // fetch repositories
    const [repositories, setRepositories] = useState([]); // [
    const [selectedRepository, setSelectedRepository] = useState(); // [
    const { data: session, status } = useSession()

    const username = session?.user?.username

    // if user is not authenticated push to home
    const router = useRouter()

    // useEffect(() => {
    //     if (status === "unauthenticated") router.push('/')
    // }, [status])


    const handleFetchRepositories = async (page = 1) => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=100`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setRepositories((prevRepos) => [...prevRepos, ...data]);
                    if (page < 3) {
                        handleFetchRepositories(page + 1); // Fetch next page
                    }
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

    const handleAddTech = () => {
        const techInput = getValues('technologies');
        if (techInput) {
            setSelectedTechnologies(prev => [...prev, { name: techInput }])
            setValue('technologies', '')
        }
    }


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

    // useEffect(() => {
    //     fetchIcons()
    // }, [])

    // const { uploadImagesToFirebase } = useUploadImages();

    const createProject = async (project: IProjectToCreate) => {
        setLoading(true)
        const userId = await getUserByUsername(username);
        project.userId = userId;
        project.likes = 0;
        console.log("este é o json enviado", project)
        axios.post("/api/projects/create", project)
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Project created successfully")
                    router.push("/projects")
                    setLoading(false)
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                console.log(error.response.data.message)
                setLoading(false)
                return error
            })
    }


    const onSubmit: SubmitHandler<IProjectToCreate> = async (data) => {
        const valueSubmit = data;
        const images = await handleImageUpload().then((prjImages) => {
            if (prjImages) {
                console.log(prjImages);
                valueSubmit.projectImages = prjImages;
            }
        })
            .catch((error) => {
                console.log(error)
            });

        valueSubmit.technologies = selectedTechnologies;
        // setProject(valueSubmit)

        console.log(valueSubmit)

        await createProject(valueSubmit);
    }


    const getUserByUsername = async (username: string) => {
        try {
            const response = await fetch(`/api/users/username/${username}`)
            const data: User = await response.json();
            return data?.id;
        } catch (error) {
            console.log(error)
        }
    }

    // image input
    const [imagesSelected, setImagesSelected] = useState<File[]>([]);
    const [imagesUploaded, setImagesUploaded] = useState<ProjectImages[]>([]);

    const { selectImageLocally, result } = useSelectImage()
    const handleImageUpload = async () => {
        try {
            setLoading(true);
            let projectImages: ProjectImages[] = []
            const uploadPromises = imagesSelected.map(async (file) => {

                const formData = new FormData();
                formData.append("upload_preset", "dev-spotlight");
                formData.append("cloud_name", "du4wrvo5j");
                formData.append("file", file);

                return axios.post("https://api.cloudinary.com/v1_1/du4wrvo5j/image/upload", formData)
                    .then((response) => {
                        console.log(response.data.secure_url);
                        setImagesUploaded(prev => [...prev, response.data.secure_url])
                        projectImages.push({ url: response.data.secure_url })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });

            await Promise.all(uploadPromises);

            // imagesUploaded array now contains all secure_urls
            console.log({ projectImages });
            return projectImages;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        // console.log(result)
        selectImageLocally(imagesSelected);
    }, [imagesSelected])
    // useEffect(() => {
    //     console.log(session?.user)
    // }, [session?.user])
    // useEffect(() => {
    //     console.log(imagesUploaded)
    // }, [imagesUploaded])


    return (
        <div className='md:py-24' >
            {loading && <Loading />}
            <Header />
            <div className='mx-auto space-y-5 w-full p-3  md:px-40'>
                <h1 className='text-2xl font-bold text-mainGray text-center tracking-widest uppercase font-georgeTown break-all'>Create Project</h1>

                {/* PESQUISAR O REPOSITORIO NO GITHUB */}
                {/* <div className="flex flex-col">
                    <button onClick={(e) => handleFetchRepositories(e)} type="button" className='px-3 py-1 text-mainGray hover:text-mainPurple flex items-center'>
                        Seach in your Repositories
                        <GoLinkExternal className='text-mainPurple' />
                    </button>
                    {repositories.length > 0 && (
                        <select onChange={handleSelectedRepository} className='w-full bg-black rounded-md px-3 py-2 border border-zinc-700 hover:border-mainPurple focus:outline-none focus:border-mainPurple'>
                            {repositories && repositories.map((repo, i) => (
                                <option value={repo.name} key={repo.id}>{i} - {repo.name}</option>
                            ))}
                        </select>
                    )}

                </div> */}

                <form className='xl:max-w-5xl mx-auto flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className='flex flex-col gap-5 lg:w-1/2 '>
                            <InputDefault register={register} label='Name' registerName='name' validationRules={{
                                required: 'Name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Minimum of 3 characters',
                                },

                            }} errors={errors} value={selectedRepository && selectedRepository?.name} />



                            <InputDefault register={register} label='Repository Link' registerName='linkRepo' validationRules={{ required: 'Repository Link is required' }} errors={errors} value={selectedRepository && selectedRepository?.html_url} />
                            <InputDefault register={register} label='Deploy Link' registerName='deployedLink' value={selectedRepository && selectedRepository?.deploy} />
                        </div>

                        <div className='flex flex-col gap-5 lg:w-1/2 '>
                            <InputDefault
                                register={register}
                                label='Technologies'
                                registerName='technologies'
                                validationRules={{ required: selectedTechnologies.length <= 0 && 'Technologies is required' }}
                                errors={errors}
                                placeholder="Press Space to add"
                            />

                            <ButtonIcon onClick={handleAddTech} icon={<GoPlusCircle size={15} className='text-mainPurple' />} text='Add' textColor='mainGray' textSize='sm' />

                            {
                                selectedTechnologies && (
                                    <div className='flex gap-2 flex-wrap'>
                                        {selectedTechnologies.map((tech, i) => {
                                            return (
                                                <p key={i} className={`text-white px-3 py-1 rounded-md bg-mainPurple`}>{tech?.name}</p>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        </div>
                    </div>



                    <div className="flex flex-col md:flex-row flex-wrap  items-center gap-3">
                        <label htmlFor='fileInput' className="text-sm 
                            mr-5 py-2 px-5 border border-mainPurple outline-none rounded-md
                           bg-transparent text-mainPurple
                            hover:cursor-pointer hover:bg-mainPurple
                            hover:text-white transition-all ease-in-out w-56 flex items-center justify-center">
                            <p>Select Images</p>
                        </label>
                        <input
                            id='fileInput'
                            type="file"
                            multiple
                            onChange={(e) => {
                                const selectedFiles = Array.from(e.target.files);
                                setImagesSelected((prev) => [...prev, ...selectedFiles]);

                            }}

                            className='hidden'
                        />

                        {/* <Button onClick={handleImageUpload}>
                            UPLOAD IMAGE
                        </Button> */}


                        {result && result.map((img, index) => (
                            <div key={index} className='flex flex-col md:flex-grid md:grid-cols-3 flex-wrap items-center gap-3'>
                                <Image className='w-[150px] h-[100px] object-cover' src={img} alt={`Image ${index + 1}`} width={1920} height={1080} />
                            </div>
                        ))}

                    </div>

                    <div className="flex flex-col gap-3 lg:hidden">
                        <label className='flex flex-col text-mainGray italic'>
                            Description:
                            <Textarea
                                {...register("description", { required: 'Description is required', minLength: { value: 50, message: 'Minimum of 50 characters', }, })}
                                className={`w-full bg-black rounded-md px-3 py-2 border  hover:border-mainPurple  focus:outline-none focus:border-mainPurple focus-visible:ring-offset-0 focus-visible:ring-0 ${errors?.description ? 'border-red-500' : 'border-zinc-700'}`} />
                            {errors.description && (
                                <span className="text-red-500 text-xs">
                                    {errors.description?.message}
                                </span>
                            )}
                        </label>
                    </div>


                    {/* <Tiptap /> */}

                    <ReactEditor />

                    {/* <DialogComponent open={openDialog} setOpen={handleOpenDialog} isCreated={projectCreated} />
                    <Button onClick={handleOpenDialog}>Open Modal</Button> */}
                    <GlowButton text='Create' type='submit' />
                </form>

            </div >

            {/* <Footer /> */}
        </div >
    )
}

export default Index