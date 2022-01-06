import Layout from '../../../components/Admin/Layout/Layout'
import ContentForm from '../../../components/Admin/EditForms/ContentForm'
import { useState, useEffect } from 'react'
import { ref } from '../../../lib/Db/document'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { SaveBar } from '../../../components/Admin/FormElements'

const Edit = () => {

    const [ data, loading, error ] = useDocumentDataOnce( ref( 'singlepage', 'landingpage' ) )

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
        if( data ) {
            setPgTitleTo( data.sections.biography.title )
            setPgContentTo( data.sections.biography.content )
        }
    }, [ data ])

    const parseData = () => {
        return ({
            "sections.biography.title": pg_title,
            "sections.biography.content": pg_content,
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
                                <ContentForm
                                    values={{ pg_title, pg_content }}
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