"use client";
import Head from "next/head";
import Hero from "../components/main/Hero";
import Connection from "../components/main/Connection";
import StarsCanvas from "../components/main/StarBackground";
import Navbar from "../components/main/Navbar";
import Footer from "../components/main/Footer";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>NFT Friends Alpha</title>
          <meta name="description" content="Friends Always Win" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="author" content="PANDA 🐼" />
          <meta name="twitter:image:src" content="https://nftfriendsalpha.com/assets/NavLogo.png" />
          <meta name="twitter:image:alt" content="NFT Friends Alpha" />
          <meta name="twitter:title" content="NFT Friends Alpha" />
          <meta name="twitter:description" content="Friends Always Win!" />
          <meta name="twitter:url" content="https://nftfriendsalpha.com/" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:title" content="NFT Friends Alpha" />
          <meta property="og:description" content="Friends Always Win" />
          <meta property="og:image" content="https://nftfriendsalpha.com/assets/NavLogo.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <StarsCanvas />
        <Navbar />
        <Hero />
        <Connection />
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}
