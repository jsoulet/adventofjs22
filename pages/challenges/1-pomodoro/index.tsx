import Head from "next/head"
import styled from "styled-components"
import Pomodoro from "../../../components/pomodoro"
import Page from '../../../components/Page'

const StyledPage = styled(Page)`
  background: #2B2A30;
`

const PomodoroPage = () => {
  return <StyledPage title="Pomodoro">
    <Pomodoro/>
  </StyledPage>
}

export default PomodoroPage