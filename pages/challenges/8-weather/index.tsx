import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import Page from '../../../components/Page'
import { WeatherDay, IconSprite, WeatherSprite } from '../../../components/weather'

const StyledPage = styled(Page)`
    background: #E9F5FA;
    padding: 0;
    margin: 0;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DaysWrapper = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`

const PARIS_POSITION = {
  latitude: 48.8534,
  longitude: 2.3488
}

const GEOLOC_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

interface Position {
  latitude: number,
  longitude: number,
}

interface UseWeatherParams {
  startDate: Date,
  endDate: Date,
  latitude?: number,
  longitude?: number,
}

interface OpenMeteoApiResponse {
  daily: {
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    time: string[],
    weathercode: number[]
  }
}

type WeatherOfTheDay = {
  time: string,
  weathercode: number,
  temperature_2m_min: number,
  temperature_2m_max: number,
  precipitation_sum: number,
}

const useWeather = ({startDate, endDate, latitude, longitude}: UseWeatherParams, queryOptions = {}) => {
  const startDateWithoutTime =  startDate.toISOString().split('T')[0]
  const endDateWithoutTime =  endDate.toISOString().split('T')[0]
  return useQuery(
    ['weather', startDateWithoutTime, startDateWithoutTime, latitude, longitude],
    async () => {
      const url = new URL('https://api.open-meteo.com/v1/meteofrance')
        const params = Object.entries({
          daily: ['weathercode','temperature_2m_max','temperature_2m_min', 'precipitation_sum'].join(','),
          timezone: 'auto',
          start_date: startDateWithoutTime,
          end_date: endDateWithoutTime,
          latitude,
          longitude,
        }).reduce((previousValue, [key, value]) => {
          const stringified = `${key}=${value}`
          return previousValue + stringified + '&'
        }, '')
        console.log(params)
        const response = await fetch(url + '?' + params)
        const data = await response.json() as OpenMeteoApiResponse
        const formattedData = Object.entries(data.daily).reduce((accu, [key, values]) => {
          return values.map((value, index) => {
            const dayData = accu[index] || {}
            return {
              ...dayData,
              [key]: value
            }
          })
        }, [] as WeatherOfTheDay[])
        return formattedData
    },
    {
      enabled: !!latitude && !!longitude,
      initialData: []
    })
}

const MultiSelectPage = () => {
  const [position, setPosition] = useState<Position | undefined>()
  const today = new Date();
  const in5Days = new Date();
  (in5Days.setDate(in5Days.getDate() + 4))
  const {data: weatherData} = useWeather({
    startDate: today,
    endDate: in5Days,
    ...(position || {})
  })
  useEffect(() => {
    const { geolocation } = navigator
    if(!geolocation) {
      return
    }
    geolocation.getCurrentPosition((position) => {
      const coordinates = position.coords
      setPosition({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      })
    }, () => {
      setPosition(PARIS_POSITION)
    }, GEOLOC_OPTIONS)
  }, [])
  return <StyledPage title="MultiSelect">
    <DaysWrapper>
      {weatherData.map(weatherDay => {
        return <WeatherDay
          key={weatherDay.time}
          date={weatherDay.time}
          tempMax={weatherDay.temperature_2m_max}
          tempMin={weatherDay.temperature_2m_min}
          precipitation={weatherDay.precipitation_sum}
          weathercode={weatherDay.weathercode}
        />
      })}
    </DaysWrapper>
    <IconSprite/>
    <WeatherSprite/>
  </StyledPage>
}

export function getStaticProps() {
  return {
    props: {
      
    }
  }
}

export default MultiSelectPage