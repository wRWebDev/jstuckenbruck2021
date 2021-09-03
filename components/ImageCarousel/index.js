import { useState, useEffect } from 'react'
import SwiperCore, { Navigation, Thumbs, Keyboard, Zoom, Controller, Lazy } from 'swiper' 
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { RemoveScroll } from 'react-remove-scroll';

const ImageCarousel = ({ images, folder, closeOfferPane }) => {
    
    SwiperCore.use([Navigation, Keyboard, Controller, Lazy]);

    const [ mainSwiper, setMainSwiperTo ] = useState(null)
    const [ fullScreenSwiper, setFullScreenSwiperTo ] = useState(null)
    const [ showingFullscreen, setShowingFullscreenTo ] = useState(false)
    const [ showingZoomMessage, setShowingZoomMessageTo ] = useState(false)

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
                style={{cursor:'zoom-in'}}
                navigation={{
                    nextEl: '#mainSwiperNext',
                    prevEl: '#mainSwiperBack',
                }}
            >
                {
                    images.map((image, i) => {return (
                        <SwiperSlide
                            key={nanoid()}
                        >
                                <img 
                                    src={`${process.env.AWS_BUCKET}${folder}/${image}`} 
                                />
                        </SwiperSlide>
                    )})
                }
            </Swiper>
        </>
    )

}

export default ImageCarousel