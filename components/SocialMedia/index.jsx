import { socialMediaLinks } from '../../include/socialMediaLinks'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'


const SocialMedia = () => {

    /* On pageload, paint SVGs */
    useEffect(()=>{
        socialMediaLinks.forEach( sm => { 
            document.querySelectorAll(`.sm-${sm.name}`).forEach( el => el.innerHTML = sm.icon)
        })
    }, [])

    return (
        <div className="socialMedia">
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