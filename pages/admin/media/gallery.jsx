import Layout from '../../../components/Admin/Layout/Layout'
import UploadImage from '../../../components/Admin/UploadImage'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db, doc, update, add } from '../../../lib/Db/document'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import Gallery from '../../../components/Admin/Media/Gallery'

const Media = () => {

    const [ data, loading ] = useDocumentData( doc( db, 'singlepage', 'landingpage' ) )

    const addImgToGallery = filename => {
        let credit = prompt( "Please credit the image", "" )
        let images = data.media.images
        images.unshift({ credit, filename })
        update( 'singlepage', 'landingpage', {
            "media.images": images
        })
    }

    const deleteImgFromGallery = index => {
        let images = data.media.images.filter( ( img, i ) => i !== index )
        update( 'singlepage', 'landingpage', {
            "media.images": images
        })
    }

    return (
        <Layout>

            {
                loading
                    ?   <LoadingPage />
                    :   <>
                            <h1>Gallery</h1>
                            <UploadImage 
                                name="newGalleryImg"
                                updateFilenameInDb={addImgToGallery}
                                folder="uploads"
                                buttonText="Add Image"
                                showPreview={false}
                            />
                            <Gallery 
                                images={data.media.images || []}
                                folder="uploads"
                                handleDelete={deleteImgFromGallery}
                            />
                        </>
            }


        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Media