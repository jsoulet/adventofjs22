import styled from 'styled-components'
import { EpisodeWithStatus } from '../../../types/multiselect'
import Episode from './Episode'
import useCheckedEpisodes from './useCheckedEpisodes'

const Content = styled.div`
  background: white;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  padding: 60px 80px;
  height: 450px;
  overflow-y: auto;
`
const H1 = styled.h1`
  font-weight: bold;
  font-size: .75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #A7A7A7;
  margin: 0 0 40px 0;
  padding: 0;
`

const StyledList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

interface Props {
  episodes: EpisodeWithStatus[]
}

const Container = ({ episodes } : Props) => {
  const { checkedEpisodes, onClickEpisode } = useCheckedEpisodes(episodes)
  return <Content>
    <H1>LISTEN TO ALL THE COMPRESSED.FM EPISODES</H1>
    <StyledList>
      {checkedEpisodes.map(episode => <Episode
        name={episode.name}
        key={episode.id}
        id={episode.id}
        checked={episode.checked}
        onClick={onClickEpisode}
      ></Episode>)}
    </StyledList>
  </Content>
}

export default Container