import { formatText } from '../../include/texttools'
import SocialMedia from '../SocialMedia'

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
                    <article className="desktop">
                        { paragraphs.map( (p,i) => <p key={i}>{formatText(p)}</p> ) }
                        <SocialMedia align="center" />
                    </article>
                    <article className="mobile">
                        { paragraphs.slice(0,3).map( (p,i) => <p key={i}>{formatText(p)}</p> )}
                        <SocialMedia align="center" />
                    </article>
                </div>
            </section>
        </>
    )
}

export default Biography