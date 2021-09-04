import SwiperCore, { Navigation, Keyboard, Controller } from 'swiper' 
import { Swiper, SwiperSlide } from 'swiper/react'
import { nanoid, urlAlphabet } from 'nanoid'

const ImageCarousel = ({ videos }) => {
    
    SwiperCore.use([Navigation, Keyboard, Controller]);

    return (
        <>
            {/* Main Swiper */}
            <Swiper
                loop={true}
                loopedSlides={videos.length}
                slidesPerView={1}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true
                }}
            >
                {
                    videos.map(( video ) => {return (
                        <SwiperSlide
                            key={nanoid()}
                        >
                            <a 
                                className="video-slide"
                                style={{
                                    backgroundImage: `url(https://img.youtube.com/vi/${video.id}/hqdefault.jpg)`
                                }}
                                rel="noopener noreferrer"
                                target="_blank"
                                href={`https://youtube.com/watch?v=${video.id}`}
                            >
                                <h2>{video.title}</h2>
                                <h3>{video.subtitle}</h3>
                            </a>
                        </SwiperSlide>
                    )})
                }
            </Swiper>
        </>
    )

}

export default ImageCarousel