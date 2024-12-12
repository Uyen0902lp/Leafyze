'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore from 'swiper';

import BS from '@/assets/images/diseases/BS.jpg';
import PM from '@/assets/images/diseases/PM.jpg';
import TMV from '@/assets/images/diseases/TMV.jpg';
import YLCV from '@/assets/images/diseases/YLCV.jpg';
import TS from '@/assets/images/diseases/TS.jpg';
import LM from '@/assets/images/diseases/LM.jpg';
import HL from '@/assets/images/diseases/HL.jpg';
import EB from '@/assets/images/diseases/EB.jpg';
import LB from '@/assets/images/diseases/LB.jpg';
import SLS from '@/assets/images/diseases/SLS.jpg';
import SSM from '@/assets/images/diseases/SSM.jpg';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const DiseaseCarousel: React.FC = () => {
  const diseases = [
    { id: '1', name: 'Bacterial Spot', image: BS },
    { id: '2', name: 'Early Blight', image: EB },
    { id: '3', name: 'Late Blight', image: LB },
    { id: '4', name: 'Leaf Mold', image: LM },
    { id: '5', name: 'Septoria Leaf Spot', image: SLS },
    { id: '6', name: 'Target Spot', image: TS },
    { id: '7', name: 'Tomato Yellow Leaf Curl Virus', image: YLCV },
    { id: '8', name: 'Tomato Mosaic Virus', image: TMV },
    { id: '9', name: 'Healthy', image: HL },
    { id: '10', name: 'Powdery Mildew', image: PM },
    { id: '11', name: 'Two-Spotted Spider Mites', image: SSM },
  ];

  return (
    <Swiper
      effect="coverflow"
      centeredSlides={true}
      loop={true}
      spaceBetween={30}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      navigation
      className="swiper-container"
    >
      {diseases.map((disease) => (
        <SwiperSlide key={disease.id}>
          <div style={{ textAlign: 'center' }}>
            <Image
              src={disease.image}
              alt={disease.name}
              width={300}
              height={300}
            />
            <h5 style={{ marginTop: '10px' }}>{disease.name}</h5>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DiseaseCarousel;
