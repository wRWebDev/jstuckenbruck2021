import { useEffect } from 'react'
import { getContext } from '../../include/context'

import Hero from './Hero'
import Biography from './Biography'
import Schedule from './Schedule'
import Media from './Media'
import Contact from './Contact'

import $ from 'jquery'

const LandingPage = ({ content, events }) => {

    const { backgroundSlider } = getContext()

    const jQuerycode = () => {

        let section, scrollPos, biog, schedule, media

        $(document).ready( () => {
            section = 0
            biog = $('#section_biog').offset().top
            schedule = $('#section_schedule').offset().top
            media = $('#section_media').offset().top
        })

        $(window).on('resize', () => {
            biog = $('#section_biog').offset().top
            schedule = $('#section_schedule').offset().top
            media = $('#section_media').offset().top
        })

        $(window).on('scroll', () => {
            
            scrollPos = window.pageYOffset

            if ( scrollPos < biog ) {
                if ( section === 0 ) return
                section = 0
                backgroundSlider.slideTo(0)
            }
            else if ( scrollPos < schedule ) {
                if ( section === 1 ) return
                section = 1
                backgroundSlider.slideTo(1)
                return
            }
            else if ( scrollPos < media ) {
                if ( section === 2 ) return
                section = 2
                backgroundSlider.slideTo(2)
                return
            }
            else {
                if ( section === 3 ) return
                section = 3
                backgroundSlider.slideTo(3)
                return
            }
        })
        
        // setInterval( () => {

            

        // }, 500 )

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