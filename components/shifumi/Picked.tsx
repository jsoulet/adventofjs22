import styled, { css } from "styled-components"
import Image from 'next/image'
import { Choice } from "../../types/shifumi"
import H1 from "./H1"

interface Props {
  player: 'user' | 'computer'
  choice: Choice,
  isWinner: boolean,
}
const StyledImage = styled(Image)`
  object-fit: contain;
`

const Root = styled.div<Pick<Props, ('player' | 'isWinner')>>`
  ${StyledImage} {
    mix-blend-mode: multiply;
  }
  ${props => {
    if(!props.isWinner) {
      return css`
        ${H1} {
          visibility: hidden;
        }
      `
    }
  }}
  ${props => {
    if(props.player === 'computer') {
      return css`
        ${StyledImage} {
          transform: scaleX(-1);
        }
      `
    }
  }}
`

const Picked = ({player, choice, isWinner}: Props) => {
  const catchPhrase = player === 'user' ? 'you win' : 'computer wins'
  return <Root player={player} isWinner={isWinner}>
    <H1>{catchPhrase}</H1>
    <StyledImage priority src={`/images/shifumi/${choice}.png`} height={550} width={550} alt={choice}/>
  </Root>
}

export default Picked