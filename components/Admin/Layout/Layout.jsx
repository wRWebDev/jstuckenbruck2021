import Head from 'next/head'
import Header from './Header'
import Menu from './Menu'

const Layout = ({ children }) => {

    return (

        <>

            <Head>
                <title>Admin | J Stuckenbruck</title>
                <link  
                    rel="icon" 
                    type="image/svg+xml" 
                    href="favicon.svg" 
                />
                <base href="/" />
                <meta charSet="utf-8" />
                <meta 
                    name="viewport"           
                    content="initial-scale=1.0, width=device-width" 
                />
            </Head>


            <div id="admin_wrapper">

                <Header />

                <main>
                    { children }
                </main>

                <Menu />

            </div>


        </>

    )

}

export default Layout