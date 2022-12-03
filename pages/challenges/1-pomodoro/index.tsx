import Head from "next/head"
import styled, {createGlobalStyle} from "styled-components"
import Pomodoro from "../../../components/pomodoro"


const Page = styled.main`
  align-items: center;
  background: #2B2A30;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  min-width: 100vw;
  padding: 0;
`

const PomodoroPage = () => {
  return <Page>
    <Head>
      <title>Pomodoro</title>
    </Head>
    <Pomodoro/>
  </Page>
}

export default PomodoroPage