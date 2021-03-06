import Layout from '../../../components/Admin/Layout/Layout'
import UploadImage from '../../../components/Admin/UploadImage'
import { db, doc, update } from '../../../lib/Db/document'
import { LoadingPage } from '../../../components/Admin/Layout/Loading'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Link from 'next/link'
import Image from 'next/image'

const Edit = () => {

    const [ data ] = useDocumentData( doc( db, 'singlepage', 'landingpage' ) )

    const updateImage = async filename => {
        await update( 'singlepage', 'landingpage', { "sections.hero.img": filename } )
    }

    return (
        <Layout>

            <Link href="/admin/edit" passHref>
                <div style={{
                    position: 'relative',
                    height: '15pt',
                    width: '15pt'
                }}>
                    <Image
                        src="/img/back.svg"
                        layout="fill"
                        objectFit={'contain'}
                        objectPosition={'center'}
                        placeholder="empty"
                        alt="Back to content"
                    />
                </div>
            </Link> 

            {
                !data 
                    ?   <LoadingPage /> 
                    :   <>
                            <h1 style={{marginTop: '20pt'}}>Edit</h1>
                            <h2 style={{marginBottom: '20pt'}}>Home</h2>
                            <UploadImage
                                name="heroimg"
                                folder="uploads"
                                currentImage={ data.sections.hero.img }
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