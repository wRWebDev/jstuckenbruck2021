import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ properties, children }) => {

    return (

        <>

            <Head>
                <title>{ properties.title }</title>
                <link rel="icon" type="image/svg+xml" href="favicon.svg" />
                <base href="/" />
                <meta charSet="utf-8" />
                <meta name="viewport"           content="initial-scale=1.0, width=device-width" />
                <meta property="og:type"        content="website" />
                <meta property="og:title"       content={ properties.title } />
                <meta property="og:description" content={ properties.description } />
                <meta property="og:image"       content={ properties.sm_image } />
                <meta property="og:url"         content={ process.env.URL } />
                <meta property="twitter:card"   content="summary_large_image" />
                <meta name="keywords"           content={ properties.keywords.join(', ') } />
            </Head>

            <Header />

            <main>
                { children }
            </main>

            <Footer />

        </>

    )

}

export default Layout