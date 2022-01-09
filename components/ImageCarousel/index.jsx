import { useState, useEffect } from 'react'
import SwiperCore, { Navigation, Keyboard, Controller, Lazy } from 'swiper' 
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { nanoid } from 'nanoid'

const ImageCarousel = ({ images, folder }) => {
    
    SwiperCore.use([Navigation, Keyboard, Controller, Lazy]);

    return (
        <>
            {/* Main Swiper */}
            <Swiper
                loop={true}
                loopedSlides={images.length}
                slidesPerView={1}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true
                }}
                navigation={{
                    nextEl: '#gallerySwiperNext',
                    prevEl: '#gallerySwiperBack',
                }}
            >
                {
                    images.map((image, i) => {return (
                        <SwiperSlide
                            key={nanoid()}
                        >
                            <div className="inner-container">
                                <div className="swiper-lazy-preloader" />
                                <Image  
                                    src={`${process.env.AWS_BUCKET}${folder}/${image}`}
                                    layout={'fill'}
                                    objectFit={'contain'}
                                    objectPosition={'center'}
                                    alt=""
                                />
                            </div>
                        </SwiperSlide>
                    )})
                }
            </Swiper>
            <div id="gallerySwiperNext" className="swiper-navigation swiper-navigation-next" />
            <div id="gallerySwiperBack" className="swiper-navigation swiper-navigation-back" />
        </>
    )

}

export default ImageCarousel