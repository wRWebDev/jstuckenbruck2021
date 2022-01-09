import Layout from '../../../components/Admin/Layout/Layout'
import ContentForm from '../../../components/Admin/EditForms/ContentForm'
import { useState, useEffect } from 'react'
import { update, db, doc } from '../../../lib/Db/document'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { SaveBar } from '../../../components/Admin/FormElements'
import UploadImage from '../../../components/Admin/UploadImage'

const Edit = () => {

    const [ data ] = useDocumentData( doc( db, 'singlepage', 'landingpage' ) )
    const [ initialLoad, setInitialLoadTo ] = useState( true )

    const [ pg_title, setPgTitleTo ] = useState( '' )
    const [ pg_content, setPgContentTo ] = useState( '' )

    const updateHandler = ( name, val ) => {
        
        switch ( name ) {
            case 'pg_title':
                setPgTitleTo( val )
                break
            case 'pg_content':
                setPgContentTo( val )
                break
            default:
                break
        }
    }

    useEffect(() => {
        if( data && initialLoad ) {
            setPgTitleTo( data.sections.biography.title )
            setPgContentTo( data.sections.biography.content )
            setInitialLoadTo( false )
        }
    }, [ data ])

    const parseData = () => {
        return ({
            "sections.biography.title": pg_title,
            "sections.biography.content": pg_content,
        })
    }

    const updateImage = async filename => {
        await update( 'singlepage', 'landingpage', { "sections.biography.img": filename } )
    }

    return (
        <Layout>

            {
                !data
                    ?   <LoadingPage />
                    :   <>
                            <SaveBar
                                getData={parseData}
                                docId="landingpage"
                                collection="singlepage"
                                defaultText='Save & Close'
                                afterSaveRoute={`/admin/edit`}
                                showDelete={false}
                            />
                            <h1 style={{marginTop: '40pt'}}>Edit</h1>
                            <h2>Biography</h2>
                            <ContentForm
                                values={{ pg_title, pg_content }}
                                updateHandler={updateHandler}
                            />
                            <UploadImage
                                name="biogimg"
                                folder="uploads"
                                currentImage={ data.sections.biography.img }
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