const { chrome } = require('is_js')
import { useState, useEffect } from 'react'
import Hero from './Hero'
import Biography from './Biography'
import Schedule from './Schedule'
import Media from './Media'
import Contact from './Contact'

const LandingPage = ({ content, events }) => {

    const [ initialLoad, setInitialLoadTo ] = useState(true)
    const [ isChrome, setIsChromeTo ] = useState(false)
    useEffect(() => {
        if(initialLoad){
            if( chrome() ) 
                setIsChromeTo(true)
            setInitialLoadTo(false)
        }
    }, [])

    return (

        <>
            <Hero content={content.hero} />
            <Biography content={content.biog} isChrome={isChrome} />
            <Schedule content={content.events} events={events} isChrome={isChrome} />
            <Media content={content.media} isChrome={isChrome} />
            <Contact events={events} />
        </>

    )

}

export default LandingPage