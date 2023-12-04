import Carousel from '@/components/Carousel/Carousel'
import Header from '@/components/Header/Header'
import React, { useState } from 'react'
import { GoHeart, GoHeartFill } from 'react-icons/go'

import Image from 'next/image';
import { SwiperProps, SwiperSlide } from 'swiper/react';

import { RxExternalLink } from "react-icons/rx";
import { FaReact } from 'react-icons/fa';
import TextIcon from '@/components/TextIcon';
import ButtonPurple from '@/components/ButtonPurple';
import { useRouter } from 'next/router';

const ProjectsDetails = () => {
  const { query } = useRouter()
  const [iconHeart, setIconHeart] = useState(false)

  const settings: SwiperProps = {
    spaceBetween: 50,
    slidesPerView: 1,
    navigation: true,
    pagination: {
      clickable: true
    }
  }

  return (
    <div className='md:my-24'>
      <Header />
      <div className='mx-auto px-5 space-y-5'>
        <div className='flex justify-around items-center'>
          <h1 className='text-2xl font-bold text-mainGray'>{query.id}</h1>
          {iconHeart ? <GoHeartFill size={25} className='text-mainPurple' /> : <GoHeart className='text-mainGray' size={25} />}
        </div>

        {/* CArousel */}
        <div className="md:mx-auto ">
          <Carousel settings={settings}>
            <SwiperSlide >
              <Image className='object-cover' src={'/man-computer.jpg'} width={640} height={640} alt='' />
            </SwiperSlide>
            <SwiperSlide >
              <Image className='object-cover' src={'/user.jpg'} width={640} height={640} alt='' />
            </SwiperSlide>
          </Carousel>
        </div>

        <section>
          <h1 className='text-2xl text-mainGray font-bold'>About</h1>

          <p className='text-xs text-mainGray'>An landing page of Twenty one Pilots that shows deeper one of the best bands in the 10s.An landing page of Twenty one Pilots that shows deeper one of the best bands in the 10s.An landing page of Twenty one Pilots that shows deeper one of the best bands in the 10s.An landing page of Twenty one Pilots that shows deeper one of the best bands in the 10s.An landing page of Twenty one Pilots that shows deeper one of the best bands in the 10s.</p>
        </section>

        <section>
          <h1 className='text-2xl text-mainGray font-bold'>Technologies</h1>
          <div className="flex gap-3">
            <TextIcon text={'React'} textColor='mainGray' icon={<FaReact className='text-blue-500' />} wrap='' />
            <TextIcon text={'React'} textColor='mainGray' icon={<FaReact className='text-blue-500' />} wrap='' />
            <TextIcon text={'React'} textColor='mainGray' icon={<FaReact className='text-blue-500' />} wrap='' />
          </div>
        </section>

        <div className="grid grid-cols-2 md:flex gap-1">
          <ButtonPurple icon={<RxExternalLink size={15} />} text='Live Demo' textColor='white' textSize='sm' />
          <ButtonPurple icon={<RxExternalLink size={15} />} text='Repository' textColor='white' textSize='sm' />
          <ButtonPurple icon={<RxExternalLink size={15} />} text='Clone Project' textColor='white' textSize='sm' />
        </div>


        <section>
          <h1 className='text-2xl text-mainGray font-bold'>Creator</h1>
          <div className="flex gap-3">
            <Image className='w-[55px] h-[55px] rounded-full' src={'/user.jpg'} width={640} height={640} alt='' />
            <div>
              <h4 className='text-sm text-mainGray font-bold'>Gabriel Barros</h4>
              <p className='text-xs text-mainGray'>@ugabb</p>
              <p className='text-xs text-white bg-mainPurple rounded-md px-1'>Web Devoloper</p>

            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default ProjectsDetails