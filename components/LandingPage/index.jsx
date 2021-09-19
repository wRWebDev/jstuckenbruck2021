import { useEffect } from 'react'
import { ContextWrapper, getContext } from '../../include/context'

import Hero from './Hero'
import Biography from './Biography'
import Schedule from './Schedule'
import Media from './Media'
import Contact from './Contact'

import $ from 'jquery'

const LandingPage = ({ content, events }) => {

    const { backgroundSlider } = getContext()

    const jQuerycode = () => {

        let section = 0
        
        $(window).scroll( function() {

            let biog = $('#section_biog').offset().top
            let schedule = $('#section_schedule').offset().top
            let media = $('#section_media').offset().top
            let scrollPos = window.pageYOffset

            if ( section !== 0 && scrollPos < biog ) {
                section = 0
                backgroundSlider.slideTo(0)
            } else if ( section !== 1 && scrollPos >= biog && scrollPos < schedule ) {
                section = 1
                backgroundSlider.slideTo(1)
            } else if ( section !== 2 && scrollPos >= schedule && scrollPos < media ) {
                section = 2
                backgroundSlider.slideTo(2)
            } else if ( section !== 3 && scrollPos >= media ) {
                section = 3
                backgroundSlider.slideTo(3)
            }

        } )

    }

    useEffect(() => {
        if (backgroundSlider) {
            jQuerycode()
        }
    }, [backgroundSlider])

    return (

        <>
            <Hero content={content.hero} />
            <Biography content={content.biog} />
            <Schedule content={content.events} events={events} />
            <Media content={content.media} />
            <Contact events={events} />
        </>

    )

}

export default LandingPage