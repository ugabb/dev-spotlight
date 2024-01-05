import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const imgs = [
    "/pc.png",
    "/user.jpg",
    '/man-computer.jpg'
]

export default function CarouselShad() {
    return (
        <Carousel className="w-full max-w-2xl">
            <CarouselContent className="relative">
                {imgs.map((img, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Image className="h-[300px] object-cover" src={img} width={1920} height={1080} alt="" />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext  className="right-5"/>
            <CarouselPrevious className="left-5" />
        </Carousel>
    )
}
