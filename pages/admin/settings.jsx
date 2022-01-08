import Layout from '../../components/Admin/Layout/Layout'
import { useState, useEffect } from 'react'
import { auth, updatePassword } from '../../lib/Db'


const Settings = () => {

    const [ oldPass, setOldPassTo ] = useState( '' )
    const [ newPass, setNewPassTo ] = useState( '' )
    const [ newPassCheck, setNewPassCheckTo ] = useState( '' )
    const [ passValid, setPassValidTo ] = useState( false )
    const [ notice, setNoticeTo ] = useState( false )

    useEffect(() => {
        if( newPass.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/) )
            setPassValidTo( true )
        else if ( passValid )
            setPassValidTo( false )
        if( passValid == true && newPass == '' )
            setPassValidTo( false )
        if( newPassCheck )
            setNewPassCheckTo( '' )
    }, [ newPass ])

    const changePassword = async newPassword => {

        setOldPassTo('')
        setNewPassTo('')
        setNewPassCheckTo('')

        await updatePassword( auth.currentUser, newPassword )
            .catch( err => { 
                console.error( err )
                if( err.message = 'Firebase: Error (auth/requires-recent-login).' )
                    setNoticeTo( "You logged in so long ago, we can't confirm it's still you... Please sign in again and then retry changing your password." ) 
                else
                    setNoticeTo( err.message )
            })

        if( !notice ) setNoticeTo( 'All done!' )

    }

    return (
        <Layout>
            <p style={{color: 'red'}}>{notice}</p>
            <form 
                id="changePasswordForm"
                onSubmit={ e => { 
                    e.preventDefault()
                    changePassword( newPass )
                }}
            >
                <fieldset>
                    <label>Change Password</label>
                    <input 
                        type="password" 
                        placeholder="Current password"
                        value={ oldPass }
                        onChange={ ({ target }) => setOldPassTo( target.value ) }
                    />
                    <h4 style={{marginTop:'10pt'}}>Minimum 8 chars, at least 1 upper case letter, 1 lower case letter, 1 no. & 1 special character</h4>
                    <input 
                        type="password" 
                        placeholder="New password"
                        value={ newPass }
                        onChange={ ({ target }) => setNewPassTo( target.value ) }
                        style={{ background: !passValid ? '#fff' : 'rgba(30, 110, 113, 0.3)' }}
                        autoComplete="new-password"
                    />
                    {
                        !passValid
                            ? ''
                            : <input 
                                    type="password" 
                                    placeholder="Confirm new password"
                                    value={ newPassCheck }
                                    onChange={ ({ target }) => setNewPassCheckTo( target.value )  }
                                    style={{ background: newPass !== newPassCheck ? '#fff' : 'rgba(30, 110, 113, 0.3)' }}
                                />
                    }
                    <div className="submitContainer">
                        <button
                            disabled={ newPass !== newPassCheck }
                        >
                            Change
                        </button>
                    </div>
                </fieldset>
            </form>
        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Settings