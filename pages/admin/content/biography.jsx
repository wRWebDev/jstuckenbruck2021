import Layout from '../../../components/Admin/Layout'
import SignIn from '../../../components/Admin/Auth/SignIn'
import Individual from '../../../components/Admin/Editors/Pages/Individual'
import { getContext } from '../../../include/context'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Page = () => {
    
    const context = getContext()
    
    const [ content, setContentTo ] = useState({})

    useEffect(() => {

        if(!Object.keys(content).length) {

            try {
                axios.get(`${process.env.API}content?p=biog`)
                    .then(({data}) => {
                        if(data.alias = 'biog'){ setContentTo(data) }
                        else{ console.error(data) }
                    })
            }
            catch(err) {
                console.error(err)
            }

        }

    }, [])

    let display = Object.keys(content).length
        ? <Individual data={content} />
        : <h4>Loading...</h4>

    return (
        context.loggedIn
            ? <Layout auth={context.sessionDetails}>
                <h1>Edit the Biography</h1>
                {display}
            </Layout>
            : <SignIn />

    )

}

export default Page