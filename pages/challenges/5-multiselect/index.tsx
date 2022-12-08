import styled from 'styled-components'
import Page from '../../../components/Page'
import { Wrapper, Cover, EpisodesContainer } from '../../../components/multiselect'
import { Episode } from '../../../types/multiselect';
import episodes from './episodes.json'

const StyledPage = styled(Page)`
  font-family: 'Nunito Sans', sans-serif;
  background: #F3F3F3;
  color: #4E4E4E;
`

interface Props {
  episodes: Episode[]
}
const MultiSelectPage = ({ episodes }: Props) => {
  return <StyledPage title="MultiSelect">
    <Wrapper>
      <Cover/>
      <EpisodesContainer episodes={episodes}/>
    </Wrapper>
  </StyledPage>
}

export function getStaticProps() {
  return {
    props: {
      episodes
    }
  }
}

export default MultiSelectPage