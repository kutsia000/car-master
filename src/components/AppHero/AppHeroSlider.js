import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import AppHeroFigure from './AppHeroFigure';
import AppHeroContent from './AppHeroContent';

export default function AppHeroSlider() {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'swiper-button-disabled',
      }}
    >
      <SwiperSlide key={'123'}>
        <AppHeroContent />
        <AppHeroFigure src={'/images/hero.jpg'} />
      </SwiperSlide>
      <SwiperSlide key={'456'}>
        <AppHeroContent />
        <AppHeroFigure src={'/images/hero.jpg'} />
      </SwiperSlide>
      <div className='swiper-button swiper-button-next'>
        <ArrowNext />
      </div>
      <div className='swiper-button swiper-button-prev'>
        <ArrowPrev />
      </div>
    </Swiper>
  );
}

const ArrowNext = () => {
  return (
    <svg
      width="47"
      height="171"
      viewBox="0 0 47 171"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.1543 170L44.1543 85.5L2.15429 1"
        stroke="#4D4D4D"
        strokeOpacity="0.5"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const ArrowPrev = () => {
  return (
    <svg
      width="46"
      height="171"
      viewBox="0 0 46 171"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44 1L1.99999 85.5L44 170"
        stroke="#4D4D4D"
        strokeOpacity="0.5"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
};
