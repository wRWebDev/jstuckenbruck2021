import Layout from '../../../components/Admin/Layout/Layout'
import ContentForm from '../../../components/Admin/EditForms/ContentForm'
import { useState, useEffect } from 'react'
import { ref, update } from '../../../lib/Db/document'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { SaveBar } from '../../../components/Admin/FormElements'
import UploadImage from '../../../components/Admin/UploadImage'

const Edit = () => {

    const [ data ] = useDocumentData( ref( 'singlepage', 'landingpage' ) )
    const [ initialLoad, setInitialLoadTo ] = useState( true )

    const [ pg_title, setPgTitleTo ] = useState( '' )

    const updateHandler = ( name, val ) => {
        
        switch ( name ) {
            case 'pg_title':
                setPgTitleTo( val )
                break
            default:
                break
        }
    }

    useEffect(() => {
        if( data && initialLoad ) {
            setPgTitleTo( data.sections.schedule.title )
            setInitialLoadTo( false )
        }
    }, [ data ])

    const parseData = () => ({ "sections.schedule.title": pg_title })

    const updateImage = async filename => {
        await update( 'singlepage', 'landingpage', { "sections.schedule.img": filename } )
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
                        <ContentForm
                            values={{ pg_title }}
                            updateHandler={updateHandler}
                            showContent={false}
                        /> 
                        <UploadImage
                            name="scheduleimg"
                            folder="uploads"
                            currentImage={ data.sections.schedule.img }
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