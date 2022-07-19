import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  const goTo = (location) => {
    window.location.href = location
  }
  return (
    <>
      <Head>
        <title>Strong Notes</title>
        <meta name='description' content='Weight lifting, Simplified.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout />
    </>
  )
}
