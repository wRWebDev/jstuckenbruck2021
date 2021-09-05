import SocialMedia from '../SocialMedia'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link

const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Contact = ({ events }) => {

    const [ name, setNameTo ] = useState('')
    const [ email, setEmailTo ] = useState('')
    const [ message, setMessageTo ] = useState('')

    const [ userFeedback, setUserFeedbackTo ] = useState('')
    const [ sent, setSentTo ] = useState(false)
    const [ sending, setSendingTo ] = useState(false)

    /* Function to validate the user inputs */
    const validateForm = (details) => {
        const { name, email, message } = details
        /* Disallow if empty */
        if(!name || !email || !message){
            setUserFeedbackTo('All fields must be filled out.')
            return false
        }
        /* Disallow if name < 2, or name > 50 */
        if(name.length < 2 || name.length > 50){
            setUserFeedbackTo('Names must be between 2 and 50 characters.')
            return false
        }
        /* Disallow if email doesn't match above regex */
        if(!email.match(emailFormat) || email.length > 254){
            setUserFeedbackTo(`That isn't a valid email address.`)
            return false
        }
        /* Disallow if message shorter than 30 chars */
        if(message.length < 30){
            setUserFeedbackTo('A message must be longer than that...')
            return false
        }
        return true
    }

    /* Handle contact form submissions */
    const handleSubmit = async e => {
        console.log('submitting')
        /* Stop reload, change sending state, sort vars into obj */
        e.preventDefault()
        setSendingTo(true)
        const details = {
            name, 
            email, 
            message, 
            events
        }
        /* Send details to api endpoint if form details are valid */
        if(validateForm(details)){
            setUserFeedbackTo('Sending your message to Johann...')
            await axios.post('/api/contact-form-mailer/admin', details)
            setUserFeedbackTo('Sending you a confirmation message...')
            await axios.post('/api/contact-form-mailer/client', details)
            setUserFeedbackTo('Thank you for your message.\nYou should hear back from Johann soon.')
            setSentTo(true)
            /* Hide user message after 5s */
            setTimeout(()=>{setUserFeedbackTo('')}, 5000)
        }
        setSendingTo(false)
    }    

    /* Reset the form after message is sent */
    useEffect(()=>{
        if(sent){
            setNameTo('')
            setEmailTo('')
            setMessageTo('')
        }
    }, [sent])
    
    return (
        <section className="contact">
            <ScrollElement name="contact" />
            <h1 data-aos="fade-up">Contact</h1>
            <div className="contact-inner">
                <div className="subsection">
                    <p>Write to Johann:</p>
                    <form onSubmit={handleSubmit}>
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
                        <p style={userFeedback === '' ? {display: 'none'} : {}}>{userFeedback}</p>
                        <button 
                            type="submit"
                            disabled={(sending || !name || !email || !message) ? true : false}
                            style={(sending || !name || !email || !message) ? {cursor: 'not-allowed'} : {cursor: 'pointer'}}
                        >
                            Send
                        </button>
                    </form>
                    <SocialMedia align="left" />
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
                                priority={true}
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