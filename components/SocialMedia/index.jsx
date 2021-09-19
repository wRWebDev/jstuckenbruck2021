import { socialMediaLinks } from '../../include/socialMediaLinks'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import { getContext } from '../../include/context'

const SocialMedia = ({ align }) => {

    const context = getContext()

    /* On pageload, paint SVGs */
    useEffect(()=>{
        socialMediaLinks.forEach( sm => { 
            document.querySelectorAll(`.sm-${sm.name}`).forEach( el => el.innerHTML = sm.icon)
        })
    }, [ context.backgroundSlider ])

    return (
        <div className={`socialMedia align-${align}`}>
            <ul>
                {
                    socialMediaLinks.map( sm => (
                        <a 
                            key={nanoid()} 
                            href={sm.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-media-links"
                        >
                            <li 
                                className={`sm-${sm.name}`} 
                            />
                        </a>
                    ))
                }
            </ul>
        </div>
    )    
}

export default SocialMedia