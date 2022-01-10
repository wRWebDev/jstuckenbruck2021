import SwiperCore, { Navigation, Keyboard, Controller, Lazy } from 'swiper' 
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { nanoid } from 'nanoid'

const ImageCarousel = ({ images, folder }) => {
    
    SwiperCore.use([Navigation, Keyboard, Controller, Lazy]);

    return (
        <>
            {/* Main Swiper */}
            <div className='carousel-wrapper'>
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
                    onSlideChange={ function() {
                        let credit = document
                            .getElementById( `img-gallery-credit-id-${this.realIndex}` )
                            .dataset
                            .credit
                        document.getElementById( 'photocredit' ).innerText = credit 
                            ? `© ${credit}`
                            : ''
                    }}
                >
                    {
                        images.map((image, i) => {return (
                            <SwiperSlide key={ `i + ${nanoid(6)}` } >
                                <div className="inner-container">
                                    <div className="swiper-lazy-preloader" />
                                    <Image  
                                        src={`${process.env.AWS_BUCKET}${folder}/${image.filename}`}
                                        layout={'fill'}
                                        objectFit={'contain'}
                                        objectPosition={'center'}
                                        alt=""
                                    />
                                </div>
                                <div 
                                    id={`img-gallery-credit-id-${i}`} 
                                    data-credit={image.credit} 
                                    hidden 
                                />
                            </SwiperSlide>
                        )})
                    }
                </Swiper>
            </div>
            
            <div id="gallerySwiperNext" className="swiper-navigation swiper-navigation-next" />
            <div id="gallerySwiperBack" className="swiper-navigation swiper-navigation-back" />
        </>
    )

}

export default ImageCarousel