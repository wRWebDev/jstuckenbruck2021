const Option = ({ option, onChange }) => {
    return (
        <li 
            className="select-options-option"
            onClick={ () => onChange( option ) }    
        >
            { option.label }
        </li>
    )
}

const Options = ({ options, onChange, name }) => {

    const renderOptions = () => {
        return options.map( (opt, index) => {
            return (
                <Option
                    option={ opt }
                    onChange={onChange}
                    key={`${name}-${index}`}
                />
            )
        })
    }

    return (
        <ul>
            { renderOptions() }
        </ul>
    )
}

export default Options