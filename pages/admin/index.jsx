import Layout from '../../components/Admin/Layout/Layout'
import { checkLogin } from '../../lib/Auth'

const Dashboard = () => {
    return (
        <Layout>
            
            Dashboard

        </Layout>
    )
}

// Check login on the serverside
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Dashboard