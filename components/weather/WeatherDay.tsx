import styled, { css } from "styled-components"
import weatherCodeToHuman from "./weatherCodeToHuman"

const Day = styled.div`
  color: #4DB0D3;
  font-family: 'Krona One', sans-serif;
  text-align: center;
`
const DayOfWeek = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
`
const DayNum = styled.div`
  font-size: 4.5rem;
`

const Weather = styled(({weather, ...props}: {weather: string}) => <div  {...props}>
  <svg role="img" width="208" height="213" viewBox="0 0 208 213">
    <use xlinkHref={`#${weather}`}></use>
  </svg>
</div>)`
  position: absolute;
  ${({weather}) => {
    if(weather === 'cloudy') {
      return css`
      left: -14px;
      top: 77px;
      `
    }
    if(weather === 'clear') {
      return css`
        left: -21px;
        top: 20px;    
      `
    }
    if(weather === 'storm') {
      return css`
        left: -21px;
        top: 40px;
      `
    }
    if(weather === 'partialyCloudy') {
      return css`
        left: -14px;
        top: 20px;
      `
    }
    if(weather === 'rain') {
      return css`
        left: 31px;
        top: -13px;
      `
    }
    if(weather === 'snow') {
      return css`
        left: -25px;
        top: 20px;
      `
    }
  }}
`

const weatherToVariables = {
  cloudy: {
    background: "#4DB0D3",
    temperature: "#E6DF95",
    content: "#D3EBF4",
  },
  clear: {
    background: "#E6DF95",
    temperature: "#4DB0D3",
    content: "#247490",
  },
  storm: {
    background: "#0E2E3A",
    temperature: "#E6DF95",
    content: "#D3EBF4",
  },
  snow: {
    background: "#BCE1EF",
    temperature: "#0E2E3A",
    content: "#247490",
  },
  partlyCloudy: {
    background: "#4DB0D3",
    temperature: "#E6DF95",
    content: "#D3EBF4",
  },
  rain: {
    background: "#2B8BAD",
    temperature: "#E6DF95",
    content: "#D3EBF4",
  },
}

const Bar = styled.div<{
  '$weather': keyof typeof weatherToVariables
}>`
  background: var(--background);
  min-height: 700px;
  border-radius: 50px;
  position: relative;
  width: 164px;
  padding-top: 252px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 11px 4px 34px rgba(32, 77, 92, 0.25);
  
  ${({$weather}) => {
    const variables = weatherToVariables[$weather] || weatherToVariables['clear']
    return css`
      --background: ${variables.background};
      --temperature: ${variables.temperature};
      --content: ${variables.content};
    `
  }}
`

const Temperature = styled.div`
    font-family: 'Oswald', sans-serif;
    color: var(--temperature);
    font-size: 7rem;
    position: relative;
    padding-bottom: 60px;
`

const Degrees = styled.span`
  position: absolute;
  font-size: 3rem;
  top: 20px;
`

const Content = styled.div`
  color: var(--content);
`

const Icon = styled.svg`
  fill: currentColor;
  height: 32px;
  width: 32px;
  display: inline-block;
  position: relative;
  top: 10px;
`

const Precipitation = styled.div`
  margin-bottom: 10px;
  ${Icon} {
    left: -5px;
    position: relative;
  }
`

const Low = styled.div`
  color: var(--content);
  ${Icon}  {
    left: -3px;
  }
`



interface Props {
  weathercode: number,
  tempMin: number,
  tempMax: number,
  precipitation: number,
  date: string,
}

const stringToDate = (dateAsString: string) => {
  const [year, month, day] = dateAsString.split('-');
  const date = new Date(+year, Number(month) - 1, +day);
  return date
}

const WeatherDay = ({date: dateAsString, weathercode, tempMax, tempMin, precipitation}: Props) => {
  const date = stringToDate(dateAsString)
  const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'short'})
  const humanWeather = weatherCodeToHuman(weathercode) as keyof typeof weatherToVariables
  return <Day>
    <DayOfWeek>{dayOfWeek}</DayOfWeek>
    <DayNum>{date.getDate()}</DayNum>
    <Bar $weather={humanWeather}>
      <Weather weather={humanWeather}/>
      <Temperature>{Math.round(tempMax)}<Degrees>°</Degrees></Temperature>
      <Content>
        <Precipitation>
          <Icon role="img"> <use xlinkHref="#precipitation"></use></Icon>
          {precipitation ?? '--'} mm
        </Precipitation>
        <Low>
          <Icon role="img"> <use xlinkHref="#low"></use></Icon>
          {Math.round(tempMin)} &deg;
        </Low>
      </Content>
    </Bar>
  </Day>
}
export default WeatherDay