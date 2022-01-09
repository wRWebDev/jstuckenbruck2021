import Layout from '../../components/Admin/Layout/Layout'
import { checkLogin } from '../../lib/Auth'
import { useRouter } from 'next/router'

const Dashboard = () => {

    const router = useRouter()

    return (
        <Layout>
            
            <h2>Hi, Johann!</h2>

            <article>

                <h3 style={{marginTop: '40pt', cursor: 'pointer'}} onClick={() => router.push('/admin/edit')}>Content</h3>
                <p>Edit background images and text for each section of the site</p>
                <p>You&apos;ll also find contact details for your agent here.</p>

                <h3 style={{marginTop: '40pt', cursor: 'pointer'}} onClick={() => router.push('/admin/schedule')}>Schedule</h3>
                <p>Add / remove / update concerts and events here.</p>
                <p>Enter a concert or tour&apos;s details and then add as many dates as you need to it.</p>
            
                <h3 style={{marginTop: '40pt', cursor: 'pointer'}} onClick={() => router.push('/admin/media')}>Media</h3>
                <p>Deal with your photo and video gallerys.</p>
                <p>Just a friendly reminder that it&apos;s expecting you to link to Youtube videos.</p>

            </article>

        </Layout>
    )
}

// Check login on the serverside
export const getServerSideProps = async ctx => await checkLogin( ctx )

export default Dashboard