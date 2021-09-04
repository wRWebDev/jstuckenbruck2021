import ImageCarousel from '../ImageCarousel'
import VideoCarousel from '../VideoCarousel'

const Media = ({ content }) => {

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
                                    'swiper-image-6.jpg',
                                    'schedule-image-1024.jpg',
                                    'media-image-1024.jpg',
                                    'swiper-image-1.jpg',
                                    'swiper-image-2.jpg',
                                    'swiper-image-8.jpg',
                                    'swiper-image-5.jpg',
                                    'about-image-1024.jpg',
                                    'swiper-image-3.jpg',
                                    'swiper-image-4.jpg',
                                    'home-image-1024.jpg',
                                    'swiper-image-7.jpg'
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

                            <VideoCarousel
                                folder="scaled-images"
                                videos={[
                                    {
                                        id: "Cf8h5dbs_p0",
                                        title: "Beethoven - Symphony No.5, Mvt II",
                                        subtitle: "Covent Garden Chamber Orchestra"
                                    },
                                    {
                                        id: "Cf8h5dbs_p0",
                                        title: "Beethoven - Symphony No.5, Mvt II",
                                        subtitle: "Covent Garden Chamber Orchestra"
                                    }
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