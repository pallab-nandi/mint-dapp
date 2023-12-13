import Head from 'next/head'
import Hero from '../components/main/Hero'
import Connection from '../components/main/Connection'
import StarsCanvas from '../components/main/StarBackground'
import Navbar from '../components/main/Navbar'
import Footer from '../components/main/Footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>NFT Friends Alpha</title>
        <meta name="description" content="NFT Friends Alpha minting dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StarsCanvas />
      <Navbar />
      <Hero />
      <Connection />
      <Footer />
    </div>
  )
}
