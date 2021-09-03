import axios from 'axios'
import { useState } from 'react'
import {nanoid} from 'nanoid'
import { getContext } from '../../../include/context'

const SignIn = () => {

    const context = getContext()
    const [username, setUsernameTo] = useState('')
    const [password, setPasswordTo] = useState('')
    
    const signInUser = async ( username, password ) => {
        try {
            const {data} = await axios.post('http://localhost:1337/api/v1/auth/sign-in', {
                a: username,
                b: password+nanoid(10)
            })
            if(data.success) {
                const { a, b } = data
                context.updateSessionDetails({a, b})
                context.updateLoggedIn(true)
            }else{
                alert('Your details weren\'t correct. Please try again.')
            }
        }
        catch(err) {
            console.error(err)
        }
    }

    return (
        <div className="auth">
            
            <div className="auth_inner">
                <h1>JS</h1>
                <input type="text" placeholder="username" value={username} onChange={e => setUsernameTo(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={e => setPasswordTo(e.target.value)} />
                <button type="button" onClick={() => signInUser(username, password)}>Sign In</button>
            </div>
        
        </div>
    )
}

export default SignIn