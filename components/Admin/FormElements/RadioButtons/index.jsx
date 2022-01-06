import styles from './styles.module.scss'

const getSafeMargins = arr => {
    switch( arr.length ){
        case 2: return arr
        case 1: return [ arr[0], arr[0] ]
        default: return [ 0, 0 ]
    }
}

const handleArrayInput = ( existing, newVal ) => {
    const loc = existing.indexOf( newVal )
    return loc === -1
        ? [ ...existing, newVal ]
        : [ ...existing.slice( 0, loc ), ...existing.slice( loc + 1 ) ]
}

const checkArrayForValue = ( selectedItems, item ) => {
    return selectedItems.indexOf( item ) >= 0
}

const printCheckboxes = ( items, name, handleInput, selectedItems ) => {

    return(
        items.map(( item, i ) => 
            <label  
                key={i}
                className={styles.radioButton}
                style={{margin: 0}}
            >
                {item}
                <input 
                    type="checkbox"
                    name={name}
                    value={item}
                    onChange={() => {
                        handleInput( handleArrayInput( selectedItems, item ) )
                    }}
                    checked={checkArrayForValue( selectedItems, item )}
                />
                <span className={styles.checkmark} />
            </label>
        )
    )
}

const RadioButtons = ({ name, items, handleInput = null, selectedItems = [], margins=[] }) => {

    const safeMargins = getSafeMargins( margins )

    return (
        <div 
            className={styles.container}
            style={{margin: `${safeMargins[0]}pt ${safeMargins[1]}pt`}}
        >
            { printCheckboxes( items, name, handleInput, selectedItems ) }
        </div>
    )

}

export default RadioButtons