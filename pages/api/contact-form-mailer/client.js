/*

    Send an email to the user to notify them 
    of a successful contact form submission

        - request body = {
            name: String, 
            email: String,
            message: String --> FIXME: not needed...
        }

        - email should include details of next 2 performances

*/

// import sendgrid sdk for sending email
const sgMail = require('@sendgrid/mail')
// import request body validation function
import { validate } from '../../../include/validation'


export default async function(req, res){

    // set sendgrid api key
    sgMail.setApiKey(process.env.SENDGRID_SECRET_KEY)

    // deconstruct request body
    const { name, email, events } = req.body

    console.log(events)

    // format data to send to sendgrid api
    const emailData = {
        from: {
            name: 'Johann Stuckenbruck',
            email: 'no-reply@wrweb.dev'
        },
        personalizations: [{
            to: [{
                email: email,
                name: name
            }],
            dynamic_template_data: {
                senderName: name
            }
        }],
        template_id: process.env.SENDGRID_EMAIL_MESSAGER
    }

    // if request body valid, request that sendgrid emails the user the above info
    try {
        if(!validate(2, name, email)){
            throw new Error('Passed parameters are not valid')
        }
        await sgMail.send(emailData)
        res.status(200).send('Message successfully sent.')

    }catch (err){
        console.error(err.message)
        res.status(400).send(`${err.message}`)
    }

}