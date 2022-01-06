import Layout from '../../components/Admin/Layout/Layout'

const Settings = () => {
    return (
        <Layout>
            Settings
        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Settings