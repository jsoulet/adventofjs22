import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'

const StyledImage = styled(Image)``
const StyledLink = styled(Link)`
  background: none;
  border: 2px solid black;
  font-family: 'Roboto Mono', monospace;
  cursor: pointer;
  height: 355px;
  width: 325px;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  &:hover {
    border: 10px solid #FFB800;
  }
  ${StyledImage} {
    object-fit: contain;
  }
`

interface PickOneItemProps {
  type: 'rock' | 'paper' | 'scissors'
}
const PickOneItem = ({ type }: PickOneItemProps) => {
  return <li><StyledLink href={{ pathname: `/challenges/12-shifumi/${type}`}}>
    <StyledImage src={`/images/shifumi/${type}.png`} height={250} width={250} alt={type}></StyledImage>
    <span>{type}</span>
  </StyledLink></li>
}

const PickList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 75px;
`

const PickOne = () => {
  return <PickList>
    <PickOneItem type="rock"></PickOneItem>
    <PickOneItem type="paper"></PickOneItem>
    <PickOneItem type="scissors"></PickOneItem>
  </PickList>
}

export default PickOne

