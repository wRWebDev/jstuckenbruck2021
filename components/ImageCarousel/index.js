import { useState, useEffect } from 'react'
import SwiperCore, { Navigation, Thumbs, Keyboard, Zoom, Controller, Lazy, Autoplay } from 'swiper' 
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { RemoveScroll } from 'react-remove-scroll';

const ImageCarousel = ({ images, folder, closeOfferPane }) => {
    
    SwiperCore.use([Navigation, Keyboard, Controller, Lazy, Autoplay]);

    const [ mainSwiper, setMainSwiperTo ] = useState(null)

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
                onSwiper={setMainSwiperTo}
                navigation={{
                    nextEl: '#mainSwiperNext',
                    prevEl: '#mainSwiperBack',
                }}
                preloadImages={false}
                lazy={true}
                autoplay={{
                    delay: 5000
                }}
            >
                {
                    images.map((image, i) => {return (
                        <SwiperSlide
                            key={nanoid()}
                        >
                            <div className="inner-container">
                                <img 
                                    data-src={`${process.env.AWS_BUCKET}${folder}/${image}`} 
                                    className="swiper-lazy"
                                />
                            </div>
                            <div className="swiper-lazy-preloader"></div>
                        </SwiperSlide>
                    )})
                }
            </Swiper>
        </>
    )

}

export default ImageCarousel