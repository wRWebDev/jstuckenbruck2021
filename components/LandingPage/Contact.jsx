import { useState } from 'react'
import Image from 'next/image'

const Contact = ({ content }) => {


    const [ name, setNameTo ] = useState('')
    const [ email, setEmailTo ] = useState('')
    const [ message, setMessageTo ] = useState('')


    return (
        <section className="contact">

            <h1>Contact</h1>
            <div className="contact-inner">
                <div className="subsection">
                    <p>Write to Johann</p>
                    <form>
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            value={name}
                            onChange={ e => setNameTo(e.target.value) }
                        />
                        <input 
                            type="email" 
                            placeholder="email@address.com" 
                            value={email}
                            onChange={ e => setEmailTo(e.target.value) }
                        />
                        <textarea 
                            placeholder="Write Johann a message"
                            value={message}
                            onChange={ e => setMessageTo(e.target.value) }
                        />
                        <button 
                            type="button"
                        >
                            Send
                        </button>
                    </form>
                </div>
                <div className="subsection forbes">
                    <h2>Forbes</h2>
                    <p>International Artists Management</p>
                    <div id="forbes">
                        <div className="image">
                            <Image 
                                src={`${process.env.AWS_BUCKET}scaled-images/forbes.png`}
                                layout='fill'
                                objectFit='contain'
                                objectPosition='center'
                            />
                        </div>
                        <ul>
                            <li>
                                <a 
                                    href="https://forbes-artists.com" 
                                    target="blank" 
                                    rel="noopener noreferrer"
                                >
                                    forbes-artists.com
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="mailto:info@forbes-artists.com?subject=Enquiry%20from%20Johann%20Stuckenbruck's%20Website"
                                >
                                    info@forbes-artists.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+1%20514-968-7258">
                                    +1 514-968-7258
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact