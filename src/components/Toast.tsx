"use client"

import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { ReactNode } from "react"
import ButtonWide from "./ButtonWide"
import Image from "next/image"

type Props = {
    cloneLink: string;
}

export function Toast({ cloneLink }: Props) {
    const { toast } = useToast()

    return (
        <ButtonWide icon={<Image src={'/copy-icon.svg'} width={15} height={15} alt='icon' />} text='Clone Project'
            onClick={() => {
                toast({
                    title: "Copied to clipboard!",

                })
                navigator.clipboard.writeText(cloneLink + ".git")
            }}
        />
    )
}
