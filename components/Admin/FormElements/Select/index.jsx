import styles from './style.module.scss'
import Options from './Options'
import Search from './Search'
import { useState } from 'react'

/*
    Options should be passed as 
    [
        { label: str, value: str }
    ]
*/
const Select = ({ name = 'selectValue', selected, options, placeholder = 'Select an option', changeHandler }) => {

    const [ searchTerm, setSearchTermTo ] = useState( '' )

    let searchRegEx = new RegExp( searchTerm, 'gi' )

    let filteredOptions = options.filter( opt => {
        if( !searchTerm ) return true
        if( opt.label.match( searchRegEx ) ) return true
    })

    const handleSelection = option => {
        changeHandler( option )
        hideShowOptions()
    }

    const hideShowOptions = () => {
        document.getElementById( name ).classList.toggle('hidden')
        document.getElementById( `${name}-backdrop` ).classList.toggle('hidden')
        setSearchTermTo( '' )
    }

    const handleKeyPresses = key => {
        if( key === 'Enter' ) {
            if( filteredOptions.length === 1 )
                handleSelection(filteredOptions[0])
        }
        if( key === 'Escape' )
            hideShowOptions()
    }

    return (
        <>
        <div 
            className={ styles.select }
            onClick={() => hideShowOptions()}
        >
            <div 
                className="select-input input" 
                type="text"
            >
                { selected ? selected.label : `${placeholder}...` }
            </div>
        </div>
        <div 
            className={`${styles['select-options-backdrop']} hidden`} 
            id={`${name}-backdrop`}
            onClick={() => hideShowOptions()}
        />
        <div 
            className={`${styles['select-options']} hidden`}
            id={ name }
        >
            <main>
                <Search 
                    value={searchTerm}
                    changeHandler={setSearchTermTo}
                    styles={styles}
                    handleKeyPresses={handleKeyPresses}
                />
                <Options 
                    options={filteredOptions}
                    onChange={handleSelection}
                    name={name}
                />
            </main>
        </div>
        </>
    )

}

export default Select