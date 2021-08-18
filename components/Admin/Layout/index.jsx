import Head from 'next/head'
import Header from './Header'

const Layout = ({ children }) => {

    return (

        <>

            <Head>
                <title>Admin | Johann Stuckenbruck</title>
                <base href="/" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>


            <div className="admin">
                <Header />
                <main>
                    { children }
                </main>
            </div>

        </>

    )

}

export default Layout