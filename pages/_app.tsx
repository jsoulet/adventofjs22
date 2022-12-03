import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Advent of JavaScript 2022</title>
    </Head>
    <Component {...pageProps} />
  </>
}
