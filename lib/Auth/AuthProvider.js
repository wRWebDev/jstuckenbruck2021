import { createContext, useContext, useState, useEffect } from 'react'
import nookies from 'nookies'
import { auth } from '../Db'

const AuthContext = createContext({ user: auth.currentUser | null })

export function AuthProvider({ children }){

    const [ user, setUser ] = useState( auth.currentUser | null )

    // Listen for token changes
    // Call setUser and write new token as a cookie
    useEffect( () => {
        auth.onIdTokenChanged(async user => {
            if( !user ){
                setUser( null )
                nookies.set( undefined, 'jstuckenbruck', '', { path: '/' } )
            }else{
                const token = await user.getIdToken()
                setUser( user )
                nookies.set( undefined, 'jstuckenbruck', token, { path: '/' } )
            }
        })
    }, [])

    // Force token refresh every 10 mins ( 600,000ms )
    useEffect ( () => {
        const handle = setInterval (async () => {
            const user = auth.currentUser
            if ( user ) await user.getIdToken( true )
        }, 10 * 60 * 1000 )
        return () => clearInterval( handle )
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext( AuthContext )
}