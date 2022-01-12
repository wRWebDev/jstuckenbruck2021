const ContactForm = ({ values, updateHandler }) => {

    return (
        <>
            <form>

                <fieldset>
                    <label>Page Info</label>
                    <input 
                        type="text" 
                        name="pg_title"
                        value={ values.pg_title }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }                   
                    />
                </fieldset>

                <fieldset>
                    <label>Agency Info</label>
                    <input 
                        type="text" 
                        name="ag_title"
                        placeholder="Name"
                        value={ values.ag_title }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }
                    />
                    <input 
                        type="text" 
                        name="ag_subtitle"
                        placeholder="Tagline"
                        value={ values.ag_subtitle }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }
                    />
                    <input 
                        type="url" 
                        name="ag_website"
                        placeholder="Website e.g. https://"
                        value={ values.ag_website }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }
                    />
                </fieldset>

                <fieldset>
                    <label>Agent 1 Details</label>
                    <input 
                        type="text" 
                        name="ag_name"
                        placeholder="Full name"
                        value={ values.ag_name }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }
                    />
                    <input 
                        type="email" 
                        name="ag_email"
                        placeholder="Email address"
                        value={ values.ag_email }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }
                    />
                    <input 
                        type="tel" 
                        name="ag_phone"
                        placeholder="Phone number"
                        value={ values.ag_phone }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }
                    />
                </fieldset>

                <fieldset>
                    <label>Agent 2 Details</label>
                    <input 
                        type="text" 
                        name="ag_name2"
                        placeholder="Full name"
                        value={ values.ag_name2 }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }
                    />
                    <input 
                        type="email" 
                        name="ag_email2"
                        placeholder="Email address"
                        value={ values.ag_email2 }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }
                    />
                    <input 
                        type="tel" 
                        name="ag_phone2"
                        placeholder="Phone number"
                        value={ values.ag_phone2 }
                        onChange={ ({target}) => updateHandler( target.name, target.value ) }
                    />
                </fieldset>

            </form>
        </>
    )
}

export default ContactForm