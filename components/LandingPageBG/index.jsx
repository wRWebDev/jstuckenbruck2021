import SwiperCore, { Lazy, EffectFade, Autoplay } from 'swiper' 
import { Swiper, SwiperSlide } from 'swiper/react'
import { getContext } from '../../include/context'

const LandingPageBG = () => {
    
    SwiperCore.use( [ Lazy, EffectFade, Autoplay ] );
    
    const context = getContext()

    const images = [
        'home-image-2056.jpg',
        'about-image-2056.jpg',
        'schedule-image-2056.jpg',
        'media-image-2056.jpg'
    ]

    return (
        <>
            {/* Main Swiper */}
            <Swiper
                loop={true}
                loopedSlides={images.length}
                slidesPerView={1}
                effect = "fade"
                onSwiper = { swiper => context.setBackgroundSliderTo(swiper) }
                speed = {500}
            >
                {
                    images.map((image, i) => (
                        <SwiperSlide
                            key={ i }
                            style={{
                                backgroundImage: `url(${process.env.AWS_BUCKET}scaled-images/${image})`
                            }}
                        />
                    ))
                }
            </Swiper>
        </>
    )

}

export default LandingPageBG