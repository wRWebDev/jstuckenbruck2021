import Layout from '../../../components/Admin/Layout/Layout'

const Edit = () => {
    return (
        <Layout>
            Edit Section Content
        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Edit