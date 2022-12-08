import styled from 'styled-components'
import Keyboard from "../../../components/keyboard";
import Page from '../../../components/Page'

const StyledPage = styled(Page)`
  background: #37B2C3;
  padding: 1rem;
`

const KeybooardPage = () => {
  return <StyledPage title="Keyboard">
    <Keyboard/>
  </StyledPage>
}

export default KeybooardPage