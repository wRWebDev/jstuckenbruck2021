import { formatText } from '../../include/texttools'
import SocialMedia from '../SocialMedia'
import { nanoid } from 'nanoid'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link

const Biography = ({ content }) => {

    const paragraphs = content.body.split('\n\n')

    return (
        <>
            <section className="parallax bio">


                <div className="parallax-title">
                    <h1 data-aos="fade-up">{ content.title }</h1>
                </div>
                <div 
                    className="parallax-body darken bio" 
                    data-aos="fade-in" 
                    data-aos-duration="1000"
                >
                    <ScrollElement name="biography" />
                    <article className="desktop" id="biography-text">
                        
                        { paragraphs.map( p => <p key={nanoid()}>{formatText(p)}</p> ) }
                        
                        <ScrollElement to="contact" spy={true} smooth={true} offset={-50} duration={1000} delay={100}>
                            <div 
                                className="skiptocontact"
                            >
                                Contact Johann
                            </div>
                        </ScrollElement>
                        
                        <SocialMedia align="center" />
                    </article>
                    
                </div>
            </section>
        </>
    )
}

export default Biography