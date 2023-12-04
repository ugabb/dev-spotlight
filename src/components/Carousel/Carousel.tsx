import React from 'react'

import { Swiper, SwiperProps } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './carousel.module.css'

import { Navigation, Pagination, A11y } from 'swiper/modules';




interface SliderProps {
    settings: SwiperProps;
    children: React.ReactNode
}

const Carousel = ({ settings, children }: SliderProps) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            {...settings}
            className='w-full lg:w-2/3 xl:max-w-4xl h-[300px] object-cover'
        >
            {children}
        </Swiper>
    )
}

export default Carousel