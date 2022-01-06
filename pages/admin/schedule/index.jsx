import Layout from '../../../components/Admin/Layout/Layout'

const Events = () => {
    return (
        <Layout>
            Edit Events
        </Layout>
    )
}

// Check login on the serverside
import { checkLogin } from '../../../lib/Auth'
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Events