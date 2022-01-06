import Layout from '../../../components/Admin/Layout/Layout'
import ContactForm from '../../../components/Admin/EditForms/ContactForm'
import { useState, useEffect } from 'react'
import { ref } from '../../../lib/Db/document'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { SaveBar } from '../../../components/Admin/FormElements'

const Edit = () => {

    const [ data, loading, error ] = useDocumentDataOnce( ref( 'singlepage', 'landingpage' ) )

    const [ pg_title, setPgTitleTo ] = useState( '' )
    const [ ag_title, setAgTitleTo ] = useState( '' )
    const [ ag_subtitle, setAgSubtitleTo ] = useState( '' )
    const [ ag_website, setAgWebsiteTo ] = useState( '' )
    const [ ag_email, setAgEmailTo ] = useState( '' )
    const [ ag_phone, setAgPhoneTo ] = useState( '' )

    const updateHandler = ( name, val ) => {
        
        switch ( name ) {
            case 'pg_title':
                setPgTitleTo( val )
                break
            case 'ag_title':
                setAgTitleTo( val )
                break
            case 'ag_subtitle':
                setAgSubtitleTo( val )
                break
            case 'ag_website':
                setAgWebsiteTo( val )
                break
            case 'ag_email':
                setAgEmailTo( val )
                break
            case 'ag_phone':
                setAgPhoneTo( val )
                break
            default:
                break
        }
    }

    useEffect(() => {
        if( data ) {
            setPgTitleTo( data.sections.contact.title )
            setAgTitleTo( data.agent.title )
            setAgSubtitleTo( data.agent.subtitle )
            setAgWebsiteTo( data.agent.website )
            setAgEmailTo( data.agent.email )
            setAgPhoneTo( data.agent.phone )
        }
    }, [ data ])

    const parseData = () => {
        return ({
            "sections.contact.title": pg_title,
            "agent.title": ag_title,
            "agent.subtitle": ag_subtitle,
            "agent.website": ag_website,
            "agent.email": ag_email,
            "agent.phone": ag_phone
        })
    }

    return (
        <Layout>

            {
                loading
                    ? <LoadingPage />
                    : error
                        ?   error
                        :   
                            <>
                                <SaveBar
                                    getData={parseData}
                                    docId="landingpage"
                                    collection="singlepage"
                                    defaultText='Save & Close'
                                    afterSaveRoute={`/admin/edit`}
                                    showDelete={false}
                                />
                                <ContactForm
                                    values={{ pg_title, ag_title, ag_subtitle, ag_website, ag_email, ag_phone }}
                                    updateHandler={updateHandler}
                                /> 
                            </>
            }
    
        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Edit