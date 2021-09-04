/* 
    Function to validate the bodies of an api request
        - expectations: Number - the number of parameters the function should be expecting
        - name: String - should be string of length 2 - 50 chars
        - email: String - should match the below regex and be fewer than 255 chars (std. limit)
        - message: String - should be no less than than 30 chars in length
*/

const validate = (expectations = Number, name = String, email = String, message = String) => {
    
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(expectations === 1){
        if(!email){return false}
        if(typeof(email) !== 'string'){
            return false
        }
        if(!email.match(emailFormat) || email.length > 254){
            return false
        }
    }

    if(expectations === 2){
        if(!name || !email){
            return false
        }
    
        if(typeof(name) !== 'string' || typeof(email) !== 'string'){
            return false
        }
    
        /* Disallow if name < 2, or name > 50 */
        if(name.length < 2 || name.length > 50){
            return false
        }
        /* Disallow if email doesn't match above regex */
        if(!email.match(emailFormat) || email.length > 254){
            return false
        }
    }

    if(expectations === 3){
        if(!message){return false}
        if(typeof(message) !== 'string'){return false}
        /* Disallow if message shorter than 30 chars */
        if(message.length < 30){return false}
    }
    return true
}

export { validate }