import { formatText } from '../../lib/helpers/texttools'
import SocialMedia from '../SocialMedia'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link
import { nanoid } from 'nanoid'

const Biography = ({ content, isChrome }) => {

    const paragraphs = content.content.split('\n\n')
    
    return (
        <>
            <section 
                className={`parallax bio ${isChrome ? 'chrome' : ''}`} 
                id="section_biog"
                style={isChrome ? {backgroundImage:`url(${ process.env.AWS_BUCKET }uploads/${ content.img })`} : {}}
            >

                <div className="parallax-title">
                    <h1>{ content.title }</h1>
                </div>
                <div className="parallax-body darken bio">
                    <ScrollElement name="biography" to="" />
                    <article className="desktop" id="biography-text">
                        
                        {
                            paragraphs.map( p => <p key={nanoid()}>{formatText(p)}</p> )
                        }
                        
                        <ScrollElement 
                            to="contact" 
                            spy={true} 
                            smooth={true} 
                            offset={-50} 
                            duration={1000} 
                            delay={100}
                        >
                            <div 
                                className="skiptocontact"
                            >
                                Follow Johann
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