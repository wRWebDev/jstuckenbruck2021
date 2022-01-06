import Layout from '../../../components/Admin/Layout/Layout'

const Media = () => {
    return (
        <Layout>
            Edit Media Content
        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Media