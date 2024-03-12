"use client"

import toast from "react-hot-toast";
import ButtonWide from "./ButtonWide"
import Image from "next/image"

type Props = {
    cloneLink: string;
}

export function Toast({ cloneLink }: Props) {

    return (
        <ButtonWide icon={<Image src={'/copy-icon.svg'} width={15} height={15} alt='icon' />} text='Clone Project'
            onClick={() => {
                navigator.clipboard.writeText(cloneLink + ".git")
                toast.success("Copy to the clickboard", { iconTheme: { primary: "#B95AFF", secondary: "#fff" }, position:"top-center" })
            }}
        />
    )
}
