import { useState } from 'react'
import { auth, signInWithEmailAndPassword } from '../../lib/Db'
import Link from 'next/link'
import styles from './styles.module.scss'

const Login = ({ redirectUrl }) => {
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                window.location.href = redirectUrl
            })
            .catch(err => {
                console.error(err.message)
                switch(err.code){
                    case 'auth/user-not-found':
                        setErrorMessage('That email address could not be found.')
                        break
                    case 'auth/wrong-password':
                        setErrorMessage('That password is incorrect')
                        break
                    default:
                        setErrorMessage(err.message)
                        break
                }
            })

    }

    return (
            <div className={styles.moduleWrapper}>
                
                <img src="/img/logo.png" />
                
                <form>

                    <input 
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="username"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                
                    <input 
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    
                    {
                        errorMessage != '' &&
                            <p className={styles.userMessage}>
                                {errorMessage}
                            </p>
                    }

                    <button
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                    
                    {
                        errorMessage != ''
                            ? <Link href="/auth/password-reset"><a>forgotten your password?</a></Link>
                            : ''
                    }

                </form>
                
            </div>
    )
    
}

export default Login