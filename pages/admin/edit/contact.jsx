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
    const [ ag_phone2, setAgPhone2To ] = useState( '' )
    const [ ag_name, setAgNameTo ] = useState( '' )
    const [ ag_name2, setAgName2To ] = useState( '' )

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
            case 'ag_phone2':
                setAgPhone2To( val )
                break
            case 'ag_name':
                setAgNameTo( val )
                break
            case 'ag_name2':
                setAgName2To( val )
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
            setAgPhone2To( data.agent.phone2 )
            setAgNameTo( data.agent.name )
            setAgName2To( data.agent.name2 )
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
            "agent.phone": ag_phone,
            "agent.phone2": ag_phone2,
            "agent.name": ag_name,
            "agent.name2": ag_name2
        })
    }

    const updateImage = async filename => {
        await update( 'singlepage', 'landingpage', { "agent.img": filename } )
    }

    const deleteImage = async () => {
        await update( 'singlepage', 'landingpage', { "agent.img": "" } )
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
                            values={{ pg_title, ag_title, ag_subtitle, ag_website, ag_email, ag_email2, ag_phone, ag_phone2, ag_name, ag_name2 }}
                            updateHandler={updateHandler}
                        /> 
                        <UploadImage
                            name="agentimg"
                            folder="uploads"
                            currentImage={ data.agent.img }
                            updateFilenameInDb={ updateImage }
                            buttonText="Change Image"
                        />
                        <button 
                            style={{
                                background: 'rgb(146, 27, 27)',
                                color: '#fff !important',
                                width: '100%',
                                padding: '7pt 14pt 5pt',
                                borderRadius: 0
                            }}
                            onClick={ () => deleteImage() }    
                        >
                            Delete Image
                        </button>
                    </>
            }
    
        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Edit