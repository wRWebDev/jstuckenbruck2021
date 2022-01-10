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
