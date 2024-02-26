import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { IProjectImages } from "@/interfaces/IProject"

const imgs = [
    "/pc.png",
    "/user.jpg",
    '/man-computer.jpg'
]

type Props = {
    images: IProjectImages[];
}

export default function CarouselShad({ images }: Props) {
    return (
        <Carousel className="w-full max-w-2xl">
            <CarouselContent className="relative ">
                {images?.map((img) => (
                    <CarouselItem key={img?.id}>
                        <div className="p-1">
                            <Image className="h-[300px]  object-cover  rounded-md" src={img?.url ? img.url : ""} width={1920} height={1080} alt="" />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className="right-5" />
            <CarouselPrevious className="left-5" />
        </Carousel>
    )
}
