import Layout from '../../../components/Admin/Layout/Layout'
import UploadImage from '../../../components/Admin/UploadImage'
import { ref, update } from '../../../lib/Db/document'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Link from 'next/link'

const Edit = () => {

    const [ data ] = useDocumentData( ref( 'singlepage', 'landingpage' ) )

    const updateImage = async filename => {
        await update( 'singlepage', 'landingpage', { "sections.hero.img": filename } )
    }

    return (
        <Layout>

            <Link href="/admin/edit">
                <img
                    id="backButton" 
                    src="/img/back.svg" 
                />
            </Link> 

            {
                !data 
                    ?   <LoadingPage /> 
                    :   <UploadImage
                            name="heroimg"
                            folder="uploads"
                            currentImage={ data.sections.hero.img }
                            updateFilenameInDb={ updateImage }
                            buttonText="Change Image"
                        />
            }

        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Edit