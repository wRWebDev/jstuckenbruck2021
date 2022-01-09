const { chrome } = require('is_js')
import { useState, useEffect } from 'react'
import Hero from './Hero'
import Biography from './Biography'
import Schedule from './Schedule'
import Media from './Media'
import Contact from './Contact'

const LandingPage = ({ content }) => {

    const [ initialLoad, setInitialLoadTo ] = useState(true)
    const [ isChrome, setIsChromeTo ] = useState(false)
    useEffect(() => {
        if(initialLoad){
            if( chrome() ) 
                setIsChromeTo(true)
            setInitialLoadTo(false)
        }
    }, [ initialLoad ])

    return (

        <>
            <Hero content={content.sections.hero} />
            <Biography content={content.sections.biography} isChrome={isChrome} />
            <Schedule content={content.sections.schedule} events={content.schedule} isChrome={isChrome} />
            <Media content={content.sections.media} media={content.media} isChrome={isChrome} />
            <Contact 
                events={content.schedule} // for emails
                content={content.sections.contact}
                agent={content.agent}
            />
        </>

    )

}

export default LandingPage