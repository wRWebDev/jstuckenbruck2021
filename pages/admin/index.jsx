import Layout from '../../components/Admin/Layout/Layout'
import { checkLogin } from '../../lib/Auth'

const Dashboard = () => {
    return (
        <Layout>
            
            <h1>Dashboard</h1>
            <h2>jstuckenbruck.com</h2>

        </Layout>
    )
}

// Check login on the serverside
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Dashboard