import Hero from './Hero'
import Biography from './Biography'
import Schedule from './Schedule'
import Media from './Media'
import Contact from './Contact'

const LandingPage = ({ content, events }) => {

    return (

        <>
            <Hero content={content.hero} />
            <Biography content={content.biog} />
            <Schedule content={content.events} events={events} />
            <Media content={content.media} />
            <Contact />
        </>

    )

}

export default LandingPage