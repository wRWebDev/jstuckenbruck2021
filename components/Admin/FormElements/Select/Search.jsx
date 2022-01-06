const Search = ({ value, changeHandler, styles, handleKeyPresses }) => {

    return (
        <input 
            placeholder="Search..."
            type="text"
            value={value}
            onChange={e=>changeHandler(e.target.value)}
            className={styles['select-search-input']}
            onKeyDown={({key})=>handleKeyPresses(key)}
            autoFocus={true}
        />
    )

}

export default Search