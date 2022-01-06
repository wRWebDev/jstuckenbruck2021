const ContentForm = ({ values, updateHandler, showTitle = true, showContent=true }) => {

    return (
        <>
            <form>

                <fieldset>
                    <label>Page Info</label>
                    {
                        !showTitle
                            ?   ''
                            :   <input 
                                    type="text" 
                                    name="pg_title"
                                    value={ values.pg_title }
                                    onChange={ ({target}) => updateHandler( target.name, target.value ) }                   
                                />
                    }
                    {
                        !showContent
                            ?   ''
                            :   <textarea 
                                    name="pg_content"
                                    value={ values.pg_content }
                                    onChange={ ({target}) => updateHandler( target.name, target.value ) }
                                    rows={20}
                                />
                    }
                </fieldset>

            </form>
        </>
    )
}

export default ContentForm