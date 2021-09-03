import ImageCarousel from '../ImageCarousel'

const Media = ({ content }) => {


    console.log({
        pageName: 'media',
        content
    })

    return (
        <>
            <section className="parallax media">
                
                <div className="parallax-title">
                    <h1 data-aos="fade-up">{ content.title }</h1>
                </div>
                <div className="parallax-body media">

                    <div className="pre-gallery gallery"></div>
                    
                    <div className="carousel">
                        <div className="inner gallery">
                            <ImageCarousel 
                                folder="scaled-images"
                                images={[
                                    'about-image-1024.jpg',
                                    'home-image-1024.jpg',
                                    'schedule-image-1024.jpg',
                                    'media-image-1024.jpg',
                                    'swiper-image-1.jpg',
                                    'swiper-image-2.jpg',
                                    'swiper-image-3.jpg',
                                    'swiper-image-4.jpg',
                                    'swiper-image-5.jpg',
                                    'swiper-image-6.jpg',
                                    'swiper-image-7.jpg',
                                    'swiper-image-8.jpg',
                                ]}
                            />
                        </div>
                        <div className="copyright">
                            <span>
                                &copy; Radek Dranikowski
                            </span>
                        </div>
                    </div>

                    <div className="pre-gallery videos"></div>
                    
                    <div className="carousel">
                        <div className="inner videos">

                            <ImageCarousel
                                folder="scaled-images"
                                images={[
                                    'about-image-1024.jpg'
                                ]}
                            />

                        </div>
                    </div>



                </div>

            </section>
        </>
    )
}

export default Media