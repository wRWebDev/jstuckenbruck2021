import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function ContextWrapper({ children }) {

    const [ backgroundSlider, setBackgroundSliderTo ] = useState( null )

    let state = {
        backgroundSlider,
        setBackgroundSliderTo: slider => setBackgroundSliderTo( slider )
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