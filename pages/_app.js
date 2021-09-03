import '../styles/root.scss'
import '../styles/aos.css'

import { ContextWrapper } from '../include/context'


function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  )
}

export default MyApp
