import * as Scroll from 'react-scroll'
let ScrollLink = Scroll.Link
import SocialMedia from '../SocialMedia'
import { useEffect } from 'react'

const Header = () => {

    useEffect(() => {

        document
            .querySelectorAll('nav li')
            .forEach(el => el.addEventListener('click', () => {
                document.getElementById('menu').classList.remove('active')
                document.getElementById('menu-button').classList.remove('menu-open')
                document.querySelector('html').classList.remove('frozen')
            }))
            
            
            document.getElementById('menu-button')
            .addEventListener('click', () => {
                if ( document.getElementById('menu').classList.toggle('active') ) {
                    document.getElementById('menu-button').classList.add('menu-open')
                    document.querySelector('html').classList.add('frozen')
                    return 
                }
                document.getElementById('menu-button').classList.remove('menu-open')
                document.querySelector('html').classList.remove('frozen')
                return 
            })

    }, [])


    const Hamburger = () => {
        const arr = [1,2]
        return arr.map(i =>
            <div 
                key={i}
                className={`hamburger`}
            />
        )
    }

    return (
        <>
            <div id="menu">

                <nav>

                    <ul>
                        <li>
                            <ScrollLink to="biography" spy={true} smooth={true} offset={-150} duration={1200} delay={100}>
                                <span>
                                    Biography
                                </span>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="schedule" spy={true} smooth={true} offset={-190} duration={1400} delay={100}>
                                <span>
                                    Schedule
                                </span>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="media" spy={true} smooth={true} offset={-250} duration={1600} delay={100}>
                                <span>
                                    Media
                                </span>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink to="contact" spy={true} smooth={true} offset={-50} duration={1800} delay={100}>
                                <span>
                                    Contact
                                </span>
                            </ScrollLink>
                        </li>
                    </ul>

                </nav>

                <SocialMedia align="right" />

            </div>

            <div id="menu-button">
                <Hamburger />
            </div>

        </>
    )
}

export default Header