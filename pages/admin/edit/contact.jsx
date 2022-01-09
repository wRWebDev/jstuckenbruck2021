import Layout from '../../../components/Admin/Layout/Layout'
import ContactForm from '../../../components/Admin/EditForms/ContactForm'
import { useState, useEffect } from 'react'
import { db, doc, update } from '../../../lib/Db/document'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { SaveBar } from '../../../components/Admin/FormElements'
import UploadImage from '../../../components/Admin/UploadImage'


const Edit = () => {

    const [ data ] = useDocumentData( doc( db, 'singlepage', 'landingpage' ) )
    const [ initialLoad, setInitialLoadTo ] = useState( true )

    const [ pg_title, setPgTitleTo ] = useState( '' )
    const [ ag_title, setAgTitleTo ] = useState( '' )
    const [ ag_subtitle, setAgSubtitleTo ] = useState( '' )
    const [ ag_website, setAgWebsiteTo ] = useState( '' )
    const [ ag_email, setAgEmailTo ] = useState( '' )
    const [ ag_email2, setAgEmail2To ] = useState( '' )
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
            case 'ag_email2':
                setAgEmail2To( val )
                break
            case 'ag_phone':
                setAgPhoneTo( val )
                break
            default:
                break
        }
    }

    useEffect(() => {
        if( data && initialLoad ) {
            setPgTitleTo( data.sections.contact.title )
            setAgTitleTo( data.agent.title )
            setAgSubtitleTo( data.agent.subtitle )
            setAgWebsiteTo( data.agent.website )
            setAgEmailTo( data.agent.email )
            setAgEmail2To( data.agent.email2 )
            setAgPhoneTo( data.agent.phone )
            setInitialLoadTo( false )
        }
    }, [ data, initialLoad ])

    const parseData = () => {
        return ({
            "sections.contact.title": pg_title,
            "agent.title": ag_title,
            "agent.subtitle": ag_subtitle,
            "agent.website": ag_website,
            "agent.email": ag_email,
            "agent.email2": ag_email2,
            "agent.phone": ag_phone
        })
    }

    const updateImage = async filename => {
        await update( 'singlepage', 'landingpage', { "agent.img": filename } )
    }

    return (
        <Layout>

            {
                !data
                    ? <LoadingPage />
                    : <>
                        <SaveBar
                            getData={parseData}
                            docId="landingpage"
                            collection="singlepage"
                            defaultText='Save & Close'
                            afterSaveRoute={`/admin/edit`}
                            showDelete={false}
                        />
                        <h1 style={{marginTop: '40pt'}}>Edit</h1>
                        <h2>Contact</h2>
                        <ContactForm
                            values={{ pg_title, ag_title, ag_subtitle, ag_website, ag_email, ag_email2, ag_phone }}
                            updateHandler={updateHandler}
                        /> 
                        <UploadImage
                            name="agentimg"
                            folder="uploads"
                            currentImage={ data.agent.img }
                            updateFilenameInDb={ updateImage }
                            buttonText="Change Image"
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