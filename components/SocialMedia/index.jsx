import { socialMediaLinks } from '../../lib/socialmedia/socialMediaLinks'
import SVG from 'react-inlinesvg';
import { nanoid } from 'nanoid'

const SocialMedia = ({ align }) => {

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
                            <li className={`sm-${sm.name}`} >
                                <SVG 
                                    src={`/img/${sm.svg}.svg`}
                                />
                            </li>
                        </a>
                    ))
                }
            </ul>
        </div>
    )    
}

export default SocialMedia