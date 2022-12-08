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
  text-align: center;
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

interface Props {
  challenges: ChallengeMeta[]
}

export default function Home({ challenges }: Props) {
  return (
    <Container>
      <Main>
        <H1>
          Advent of JS 2022
        </H1>

        <Description>
          Challenges from <a href="https://www.adventofjs.com/">Advent of JavaScript</a>
          &nbsp;•&nbsp;
          Check code on <a href="https://www.adventofjs.com/">GitHub</a>
        </Description>
        <Grid>
          {challenges.map((challenge, index) => {
            const date = String((new Date(challenge.date)).getDate())
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

export async function getStaticProps() {
  const challenges = [
    {
      name: 'Pomodoro',
      slug: '1-pomodoro'
    },
    {
      name: 'Ecommerce Component',
      slug: '2-ecommerce'
    },
    {
      name: 'Keyboard',
      slug: '3-keyboard'
    },
    {}, // 4
    {
      name: 'Multi-select',
      slug: '5-multiselect'
    }
    ,
    {}, // 6
    {}, // 7
    {
      name: 'Weather',
      slug: '8-weather'
    }, 
    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
  ]
  const enrichedData = challenges.map((challenge, index) => {
    const day = (index + 1).toLocaleString('en-GB', {minimumIntegerDigits: 2})
    return {
      ...challenge,
      date: `2022-12-${day}`
    }
  })
  
  return {
    props: {
      challenges: enrichedData,
    },
  }
}
