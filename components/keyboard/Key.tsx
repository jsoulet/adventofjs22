import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const AUDIO_FILE_TEMPLATE_URL = '/audio/weirds-keys/key-%number%.mp3'
const PIANO_AUDIO_FILE_TEMPLATE_URL = '/audio/piano-keys/key%number%.mp3'

interface Props {
  id: string,
  tabIndex: number,
  d: string,
} 

const StyledKey = styled.path<{$isLoaded: boolean}>`
  opacity: ${({$isLoaded}) => $isLoaded ? '1': '0.5'};
  &:focus, &:active {
    outline: rgba(255, 254, 249, 0.7) dashed 2px ;
  }
`

const Key: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const audio = useRef<HTMLAudioElement>()
  useEffect(() => {
    if(!props.tabIndex) {
      return
    }
    const soundLoaded = () => {
      setIsLoaded(true)
    }
    audio.current = new Audio(PIANO_AUDIO_FILE_TEMPLATE_URL.replace('%number%', String(props.tabIndex)))
    audio.current.addEventListener('canplaythrough', soundLoaded)
    return () => {
      if(!audio.current || !isLoaded) {
        return
      }
      audio.current.removeEventListener('canplaythrough', soundLoaded)
    }
  }, [props.tabIndex, isLoaded])
  const playTone = () => {
    if(!audio.current) {
      console.error(`Cannot play sound for key ${props.tabIndex}`)
      return
    }
    if(audio.current.currentTime > 0) {
      audio.current.pause()
      audio.current.currentTime = 0
    }
    audio.current.play()
  }
  return <StyledKey $isLoaded={isLoaded} role="button" onClick={playTone} {...props}/>
}

export const White = styled(Key)`
  fill: white;
  &:hover {
    fill: #ffd200
  }
`
export const Black = styled(Key)`
  fill: black;
  &:hover {
    fill: #f40082
  }
`
