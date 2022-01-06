import '../styles/root.scss'
import { AuthProvider } from '../lib/Auth/AuthProvider'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
