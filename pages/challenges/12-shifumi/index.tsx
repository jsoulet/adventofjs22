import styled from "styled-components"
import Page from '../../../components/Page'
import { PickOne, H1} from "../../../components/shifumi"

const StyledPage = styled(Page)`
  font-family: 'Roboto Mono', monospace;
  background: #FFF;
  color: #000;
  flex-direction: column;
`

const ShifumiPage = () => {
  return <StyledPage title="Rock Paper Scissors">
    <H1>pick one</H1>
    <PickOne></PickOne>
  </StyledPage>
}



export default ShifumiPage