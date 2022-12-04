import { FC, ReactElement } from 'react'
import styled from 'styled-components'

const PanelRoot = styled.div`
    background: white;
    border-radius: 25px;
    box-sizing: border-box;
    box-shadow: 0px 0px 70px #C7CBE3;
    height: 875px;
    padding-top: 50px;
    overflow-y: scroll;
    width: 375px;
`

const PanelTitle = styled.h1`
  padding-left: 40px;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 20px;
`

interface Props {
  title: string
  children: JSX.Element[] | JSX.Element;
}

const Panel: FC<Props> = ({title, children}) => {
  return <PanelRoot>
    <PanelTitle>{title}</PanelTitle>
    {children}
  </PanelRoot>
}

export default Panel