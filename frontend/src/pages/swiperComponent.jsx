import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import your visualizer components
import BasicMusicVisualizer from './basicVisualiser';
import CircularMusicVisualizer from './circularVisualiser';
import ParticleMusicVisualizer from './particleVisualiser';

const MusicVisualizerCarousel = () => {
  return (
    <div style={{
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      height: '600px', // Adjust height as needed
    }}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1.5}
        centeredSlides={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true
        }}
        modules={[Navigation, Pagination]}
        style={{
          width: '100%',
          height: '100%',
          '--swiper-navigation-color': '#6EDCD9',
          '--swiper-pagination-color': '#E15FED',
        }}
        slideStyle={{
          opacity: 1,
          filter: 'none',
          background: 'transparent',
        }}
      >
        <SwiperSlide style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          filter: 'brightness(0.7)',
          transition: 'all 0.3s ease',
          background: 'transparent',
        }}>
          <BasicMusicVisualizer />
        </SwiperSlide>
        <SwiperSlide style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          filter: 'brightness(0.7)',
          transition: 'all 0.3s ease',
          background: 'transparent',
        }}>
          <CircularMusicVisualizer />
        </SwiperSlide>
        <SwiperSlide style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          filter: 'brightness(0.7)',
          transition: 'all 0.3s ease',
          background: 'transparent',
        }}>
          <ParticleMusicVisualizer />
        </SwiperSlide>

        {/* Custom Navigation */}
        <div
          className="swiper-button-prev"
          style={{
            color: '#6EDCD9',
            position: 'absolute',
            top: '50%',
            left: '10px',
            zIndex: 10,
            cursor: 'pointer',
          }}
        >
          ←
        </div>
        <div
          className="swiper-button-next"
          style={{
            color: '#6EDCD9',
            position: 'absolute',
            top: '50%',
            right: '10px',
            zIndex: 10,
            cursor: 'pointer',
          }}
        >
          →
        </div>

        {/* Pagination */}
        <div
          className="swiper-pagination"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        ></div>
      </Swiper>
    </div>
  );
};

export default MusicVisualizerCarousel;