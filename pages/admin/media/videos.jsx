import Layout from '../../../components/Admin/Layout/Layout'

const Media = () => {
    return (
        <Layout>
            
            <h1>Videos</h1>

        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Media