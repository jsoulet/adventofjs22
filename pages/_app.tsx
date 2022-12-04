import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import './styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={{}}>
    <Head>
        <title>Advent of JavaScript 2022</title>
        <meta name="description" content="Discover one JavaScript challenge per day until Christmas"/>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </ThemeProvider>
}
