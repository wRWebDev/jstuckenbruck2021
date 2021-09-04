/* 

    Send an email to client to notify them of a new contact form msg
     - called from pages/contact -> components/ContactForm
     - call body = {
         name: String,
         email: String,
         message: String
     }
     - data is pre-validated on page, but revalidate 
     in case request does not come from the expected source.

*/

// import sendgrid sdk
const sgMail = require('@sendgrid/mail')
import { validate } from '../../../include/validation'

export default async function(req, res){
    
    // set api key
    sgMail.setApiKey(process.env.SENDGRID_SECRET_KEY)

    // fetch and deconstruct request body
    const { name, email, message } = req.body

    // format request data to send to sendgrid api
    const emailData = {
        from: {
            name: 'Website Contact',
            email: 'no-reply@wrweb.dev'
        },
        personalizations: [{
            to: [{
                email: process.env.CLIENT_EMAIL,
                name: process.env.CLIENT_NAME
            }],
            dynamic_template_data: {
                senderName: name,
                senderEmail: email,
                message,
                clientName: process.env.CLIENT_NAME,
                clientWebsite: process.env.CLIENT_WEBSITE
            }
        }],
        template_id: process.env.SENDGRID_EMAIL_CONTACT_CLIENT
    }

    // make the api call if request body can be validated
    try {
        if(!validate(3, name, email, message)){
            throw new Error('Passed parameters are not valid')
        }
        await sgMail.send(emailData)
        res.status(200).send('Message sent successfully')
    }catch (err){
        console.error(err.message)
        res.status(400).send(`${err.message}`)
    }

}