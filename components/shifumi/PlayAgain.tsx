import Link from 'next/link'
import styled from 'styled-components'

const PlayAgain = styled((props) => <Link href="/challenges/12-shifumi" {...props}>play again</Link>)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  font-family: 'Roboto Mono', monospace;
  font-size: 2rem;
  border: 2px solid black;
  background: none;
  padding: 15px 85px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background: black;
    color: white;
  }
`

export default PlayAgain