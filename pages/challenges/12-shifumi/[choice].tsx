import styled, { css } from "styled-components"
import { useRouter } from 'next/router'
import Page from '../../../components/Page'
import { PlayAgain, Picked } from "../../../components/shifumi"
import { Choice } from "../../../types/shifumi"
import { NextPage, NextPageContext } from "next"


const StyledPage = styled(Page)<{winner: string}>`
  font-family: 'Roboto Mono', monospace;
  background-color: #FFF;
  color: #000;
  background-position: ${(props) => props.winner === 'user' ? 'left': 'right'}  top;
  background-repeat: no-repeat;
  background-size: auto 100%;
  ${({winner}) => {
    if(['user','computer'].includes(winner)){
      return css`background-image: url('/images/shifumi/${winner}.svg');`    
    }
  }}
`

const Wrapper = styled.div`
  display: flex;
  gap: 200px;
  position: relative;
`

const CHOICES: Choice[] = ['rock', 'paper', 'scissors']
function getComputerChoice(): Choice {
    const randomIndex = Math.floor(Math.random() * 3)
    return CHOICES[randomIndex]
}

const getWinner = (userChoice: Choice, computerChoice: Choice) => {
  if(userChoice === 'rock') {
    if(computerChoice === 'paper') {
      return 'computer'
    }
    if(computerChoice === 'scissors') {
      return 'user'
    }
  }
  if(userChoice === 'paper') {
    if(computerChoice === 'scissors') {
      return 'computer'
    }
    if(computerChoice === 'rock') {
      return 'user'
    }
  }
  if(userChoice === 'scissors') {
    if(computerChoice === 'rock') {
      return 'computer'
    }
    if(computerChoice === 'paper') {
      return 'user'
    }
  }
  return 'tie'
}

interface Props {
  userChoice: Choice,
  computerChoice: Choice,
  winner: string
}

const ResultPage: NextPage<Props> = ({
  userChoice,
  computerChoice,
  winner
}) => {
  return <StyledPage title="Result - Rock Paper Scissors" winner={winner}>
    <Wrapper>
      <Picked player='user' choice={userChoice} isWinner={winner === 'user'}/>
      <Picked player='computer' choice={computerChoice} isWinner={winner === 'computer'}/>
      <PlayAgain/>
    </Wrapper>
  </StyledPage>
}

ResultPage.getInitialProps = (context) => {
  const {choice: userChoice} = context.query
  const castedUserChoice = userChoice as Choice
  const computerChoice = getComputerChoice()
  const winner = getWinner(castedUserChoice, computerChoice)
  return {
    userChoice: castedUserChoice,
    computerChoice,
    winner
  }
}

export default ResultPage