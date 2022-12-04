import Head from "next/head";
import styled from 'styled-components'
import Keyboard from "../../../components/keyboard";

const Page = styled.main`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-width: 100vw;
  min-height: 100vh;
  padding: 1rem;
`

const KeybooardPage = () => {
  return <Page>
    <Head>Title</Head>
    <Keyboard/>
  </Page>
}

export default KeybooardPage