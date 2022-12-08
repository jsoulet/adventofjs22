import styled from 'styled-components'

const StyledCover =  styled.div`
 filter: drop-shadow(0px 4px 24px #453F3F);
`

const Cover = () => {
  return <StyledCover>
    <img src="/images/multiselect/podcast-cover.png" alt="Compressed.fm" />
  </StyledCover>
}

export default Cover