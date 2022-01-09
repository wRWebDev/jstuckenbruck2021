import Layout from '../../../components/Admin/Layout/Layout'
import Link from 'next/link'

const Edit = () => {
    return (
        <Layout>

            <h1>Content</h1>
            
            <nav className="adminSubMenu">

                <ul>

                    <Link href="/admin/edit/home">
                        <li>
                            Home
                        </li>
                    </Link>
                    <Link href="/admin/edit/biography">
                        <li>
                            Biography
                        </li>
                    </Link>
                    <Link href="/admin/edit/schedule">
                        <li>
                            Schedule
                        </li>
                    </Link>
                    <Link href="/admin/edit/media">
                        <li>
                            Media
                        </li>
                    </Link>
                    <Link href="/admin/edit/contact">
                        <li>
                            Contact
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

export default Edit