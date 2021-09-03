import Layout from '../../components/Admin/Layout'
import SignIn from '../../components/Admin/Auth/SignIn'

import { getContext } from '../../include/context'

const Page = () => {

    const context = getContext()
    console.log({loggedIn: context.loggedIn})

    return (
        context.loggedIn
            ?   <Layout auth={context.sessionDetails}>
                    Home
                </Layout>
            :   <SignIn />

    )

}

export default Page