import SocialMedia from '../SocialMedia'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import * as Scroll from 'react-scroll'
let ScrollElement = Scroll.Link
import { useRouter } from 'next/router'

const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Contact = ({ content, events = [], agent }) => {

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

    const router = useRouter()
    
    return (
        <section className="contact">
            <ScrollElement name="contact" to="" />
            <h1>{ content.title }</h1>
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
                            rows={5}
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
                <div className="subsection agent">
                    <h2 className="agent-titles">{ agent.title }</h2>
                    <p className="agent-titles">{ agent.subtitle }</p>
                    {
                        !agent.img ? ''
                            : <div 
                                id="agent-image"
                                onClick={ () => {
                                    return agent.website ? router.push(agent.website) : null
                                }}    
                                style={{ cursor: agent.website ? 'pointer' : 'auto' }}
                            >
                                <Image 
                                    src={ 
                                        process.env.NODE_ENV === "production" 
                                            ? `${ process.env.AWS_BUCKET }uploads/${ agent.img }` 
                                            : agent.img
                                    }
                                    layout='fill'
                                    objectFit='contain'
                                    objectPosition='center'
                                    priority={true}
                                    alt="Agent's logo"
                                />
                            </div>
                    }
                    <div id="agent-contact">
                        <ul>
                            {
                                !agent.website || (agent.img && agent.website) ? ''
                                : <li>
                                    <a 
                                        href={ agent.website } 
                                        target="blank" 
                                        rel="noopener noreferrer"
                                    >
                                        { agent.website.replace( /https:\/\/|http:\/\//i, '' ) }
                                    </a>
                                </li>
                            }
                            {
                                !agent.name ? ''
                                :   <li><strong>{ agent.name }</strong></li>
                            }
                            {
                                !agent.email ? ''
                                :<li>
                                    <a 
                                        href={`mailto:${agent.email}?subject=Enquiry%20from%20Johann%20Stuckenbruck's%20Website`}
                                    >
                                        { agent.email }
                                    </a>
                                </li>
                            }
                            {
                                !agent.phone ? ''
                                : <li>
                                    <a href={`tel:${encodeURI(agent.phone)}`}>
                                        { agent.phone }
                                    </a>
                                </li>
                            }
                            {               
                                !agent.name2 ? ''
                                :   <li><strong>{ agent.name2 }</strong></li>
                            }
                            {
                                !agent.email2 ? ''
                                :<li>
                                    <a 
                                        href={`mailto:${agent.email2}?subject=Enquiry%20from%20Johann%20Stuckenbruck's%20Website`}
                                    >
                                        { agent.email2 }
                                    </a>
                                </li>
                            }
                            {
                                !agent.phone2 ? ''
                                : <li>
                                    <a href={`tel:${encodeURI(agent.phone2)}`}>
                                        { agent.phone2 }
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact