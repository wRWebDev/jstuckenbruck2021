import axios from 'axios'
import { useState } from 'react'

const Individual = ({ data }) => {

    const [ title, setTitleTo ] = useState(data.title)
    const [ subtitle, setSubtitleTo ] = useState(data.subtitle)
    const [ body, setBodyTo ] = useState(data.body)

    const [ buttonText, setButtonTextTo ] = useState('Save Changes')

    const saveForm = async () => {
        setButtonTextTo('Saving')
        await axios.patch(`${process.env.API}content?p=${data.alias}`, {
            title,
            subtitle,
            body
        })
        setButtonTextTo('Saved')
        setTimeout(()=>{ setButtonTextTo('Save Changes') }, 3000)
    }

    return (
        
        <>
            <form className="content-edit">

                <label>
                    title
                    <input type="text" placeholder="title" value={title} onChange={e => setTitleTo(e.target.value)} />
                </label>
                {/* <input type="text" placeholder="subtitle" value={subtitle} onChange={e => setSubtitleTo(e.target.value)} /> */}
                <label>
                    body
                   <textarea value={body} onChange={e => setBodyTo(e.target.value)} rows={30} />
                </label>
                <button type="button" onClick={()=>saveForm()}>{buttonText}</button>

            </form>
        </>

    )

}

export default Individual