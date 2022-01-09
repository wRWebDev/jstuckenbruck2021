import Layout from '../../../components/Admin/Layout/Layout'
import Link from 'next/link'

const Media = () => {
    return (
        <Layout>

            <h1>Media</h1>
            
            <nav className="adminSubMenu">

                <ul>

                    <Link href="/admin/media/gallery">
                        <li>
                            Gallery
                        </li>
                    </Link>
                    <Link href="/admin/media/videos">
                        <li>
                            Videos
                        </li>
                    </Link>

                </ul>

            </nav>

        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Media