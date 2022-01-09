import ImageCarousel from '../ImageCarousel'
import VideoCarousel from '../VideoCarousel'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link

const Media = ({ content, media, isChrome }) => {


    return (
        <>
            <section 
                className={`parallax media ${isChrome ? 'chrome' : ''}`} 
                id="section_media"
                style={ isChrome ? {backgroundImage:`url(${ process.env.AWS_BUCKET }uploads/${ content.img })`} : {} }
            >
                <div className="parallax-title">
                    <h1>{ content.title }</h1>
                </div>
                <div className="parallax-body media">

                    <div className="pre-gallery gallery"></div>
                    
                    <ScrollElement name="media" to="" />

                    <div className="carousel">
                        <div className="inner gallery">
                            <ImageCarousel 
                                folder="uploads"
                                images={media.images.map( img => img.filename ) || []}
                            />
                        </div>
                        <div className="copyright">
                            <span>
                                <a 
                                    href="https://www.radekdranikowski.co.uk/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    &copy; Radek Dranikowski
                                </a>
                            </span>
                        </div>
                    </div>

                    <div className="pre-gallery videos"></div>
                    
                    <div className="carousel">
                        <div className="inner videos">

                            <VideoCarousel
                                folder="scaled-images"
                                videos={media.videos || []}
                            />

                        </div>
                    </div>



                </div>

            </section>
        </>
    )
}

export default Media

/*

    Original Images: 

    [
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
    ]

    Original Videos:

    [
        {
            id: "NTiKZhjDUIA",
            title: "V.R. Alevizos : Concerto for Piano and Symphony Orchestra",
            subtitle: "Royal Academy of Music Symphony Orchestra"
        },
        {
            id: "Cf8h5dbs_p0",
            title: "Beethoven - Symphony No.5, Mvt II",
            subtitle: "Covent Garden Chamber Orchestra"
        }
    ]

*/
