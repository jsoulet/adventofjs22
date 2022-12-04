import styled from 'styled-components'
import DayCard from '../components/home/DayCard'
import { useEffect, useState } from 'react'
import { Metadata as ChallengeMeta } from '../types/challenge'

const H1 = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
`
const Description = styled.p`
  margin: 1rem 0 4rem;
  line-height: 1.5;
  font-size: 1.5rem;
`
const Container = styled.div`
  padding: 0 2rem;
`
const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  height: 1200px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

export default function Home() {
  const [challenges, setChallenges] = useState<ChallengeMeta[]>([])
  useEffect(() => {
    const fetchChallenges = async () => {
      const response = await fetch('/api/challenges')
      const data = await response.json()
      setChallenges(data)
    }
    fetchChallenges()
  }, [])
  return (
    <Container>
      <Main>
        <H1>
          Advent of JS 2022
        </H1>

        <Description>
          Challenges from <a href="https://www.adventofjs.com/">Advent of JavaScript</a>
        </Description>

        <Grid>
          {challenges.map((challenge, index) => {
            const date = (new Date(challenge.date)).toLocaleDateString('en-GB', { day: 'numeric'})
            return <DayCard 
              key={index}
              title={date}
              details={challenge?.name}
              href={challenge?.slug ? `challenges/${challenge?.slug}`: ''}
            />
          })}
        </Grid>
      </Main>
    </Container>
  )
}
