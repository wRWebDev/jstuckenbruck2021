import { useState, useEffect } from 'react'
import SwiperCore, { Navigation, Keyboard, Controller, Lazy } from 'swiper' 
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { nanoid } from 'nanoid'

const ImageCarousel = ({ images, folder }) => {
    
    SwiperCore.use([Navigation, Keyboard, Controller, Lazy]);

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
                                />
                            </div>
                        </SwiperSlide>
                    )})
                }
            </Swiper>
        </>
    )

}

export default ImageCarousel