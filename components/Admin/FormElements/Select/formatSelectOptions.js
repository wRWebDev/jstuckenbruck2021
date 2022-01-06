const formatSelectOptions = options => {

    try {

        if( !options.length ) {
            throw('You must provide an array of options to the dropdown menu')
        }
    
        return options.map( (opt, index) => {
    
            if( ([ 'string', 'object' ]).indexOf( typeof(opt) ) < 0 ){
                throw(`Option at index #${index} must be either a string or an object.`)
            }
    
            if( typeof(opt) === 'string' ) opt = { value: opt, label: opt }

            if( typeof(opt) === 'object' ) {
                if( !opt.hasOwnProperty( 'label' ) ) {
                    if( !opt.hasOwnProperty('value') )
                        throw(`You must include a label or value property in the dropdown option, else pass a string.`)
                    opt.label = opt.value
                }
            }
    
            return opt

        })

    }
    catch( err ){
        console.error(err)
        return []
    }
    
}

export default formatSelectOptions