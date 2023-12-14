import "../styles/globals.css"
import 'react-toastify/dist/ReactToastify.css';
import { MoralisProvider } from 'react-moralis'

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}
