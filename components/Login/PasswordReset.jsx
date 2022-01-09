import { useState } from 'react'
import { auth, sendPasswordResetEmail } from '../../lib/Db'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const PasswordReset = () => {

    const [ email, setEmailTo ] = useState("")
    const [ usrMsg, setUsrMsgTo ] = useState("")

    const resetPassword = emailAddressToReset => {
        sendPasswordResetEmail( auth, emailAddressToReset )
            .then(() => {
                setUsrMsgTo("Success! Use the link that has been sent to your email to reset your password.")
            })
            .catch( err => {
                console.error(err.message)
                setUsrMsgTo("Uh oh... Something went wrong. Either try again or ask Will to have a look at what went wrong.")                
            });
    }

    return (
        <div className={styles.moduleWrapper}>

            <div id={styles.logo}>
                <Image 
                    src="/img/logo.png"
                    layout={'fill'}
                    objectFit={'contain'}
                    objectPosition={'center'}
                    alt={`Johann Stuckenbruck Logo`}
                />
            </div>
            
            <form>
                
                <input 
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmailTo(e.target.value)}
                    placeholder="Your email address"
                />
                
                {
                    usrMsg != '' &&
                        <p className={styles.userMessage}>
                            {usrMsg}
                        </p>
                }

                <button
                    className="button green-button"
                    type="button" 
                    onClick={() => resetPassword( email )}
                >
                    Reset Password
                </button>
                
                <p>
                    <Link href="/auth/login" passHref>
                        <a>return to login</a>
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default PasswordReset