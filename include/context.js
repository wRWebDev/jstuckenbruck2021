import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function ContextWrapper({ children }) {

    const [ loggedIn, setLoggedInTo ] = useState(false)
    const [ sessionDetails, setSessionDetailsTo ] = useState({})

    let state = {
        loggedIn,
        updateLoggedIn: bool => setLoggedInTo(bool),
        sessionDetails,
        updateSessionDetails: obj => setSessionDetailsTo(obj)
    }

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )

}

export function getContext() {
    return useContext(AppContext)
}