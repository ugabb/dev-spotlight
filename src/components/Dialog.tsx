import React from 'react'

import { AiOutlineLoading3Quarters } from "react-icons/ai";

// dialog
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
    open: boolean;
    setOpen: () => void;
    isCreated: "created" | "error" | "loading";
    loading: boolean;
}

const DialogComponent = ({ open, setOpen, isCreated, loading }: Props) => {
    console.log(isCreated)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-black/90">
                <DialogHeader >
                    <DialogTitle>Create Project</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center items-center">
                    {isCreated === "loading" && <AiOutlineLoading3Quarters className='animate-spin text-mainPurple' />}
                    {isCreated === "created" && <p className='text-xl text-mainPurple'>Project Created!</p>}
                    {isCreated === "error" && <p className='text-xl text-red-500'>Something Wrong</p>}
                    
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogComponent      