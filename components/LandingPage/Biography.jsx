import { formatText } from '../../include/texttools'
import SocialMedia from '../SocialMedia'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link
import { nanoid } from 'nanoid'

const Biography = ({ content }) => {

    const paragraphs = content.body.split('\n\n')
    
    return (
        <>
            <section className="parallax bio" id="section_biog">

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