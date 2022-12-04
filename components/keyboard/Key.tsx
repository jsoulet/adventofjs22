import { useCallback, useEffect, useRef, useState } from 'react'
import styled, {css} from 'styled-components'

const AUDIO_FILE_TEMPLATE_URL = '/audio/weirds-keys/key-%number%.mp3'
const PIANO_AUDIO_FILE_TEMPLATE_URL = '/audio/piano-keys/key%number%.mp3'

interface Props {
  id: string,
  tabIndex: number,
  d: string,
  listenKeyPressed: string,
  highlightedColor: string,
} 

interface StyledKeyProps {
    $isLoaded: boolean,
    $isPlaying: boolean,
    $highlightedColor: string,
}

const StyledKey = styled.path<StyledKeyProps>`
  opacity: ${({$isLoaded}) => $isLoaded ? '1': '0.5'};
  ${(props) => props.$isPlaying && css<StyledKeyProps>`&& {
    fill: ${props => props.$highlightedColor}
  }`}
  &:focus, &:active {
    outline: rgba(255, 254, 249, 0.7) dashed 2px ;
  }
`

const Key: React.FC<Props> = ({listenKeyPressed, highlightedColor, ...props}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audio = useRef<HTMLAudioElement>()
  useEffect(() => {
    if(!props.tabIndex) {
      return
    }
    let timeout: NodeJS.Timeout
    const soundLoaded = () => {
      setIsLoaded(true)
    }
    const soundIsPlaying = () => {
      setIsPlaying(true)
      timeout = setTimeout(() => {
        setIsPlaying(false)
      }, 700)
    }
    const soundIsPaused = () => {
      setIsPlaying(false)
    }
    audio.current = new Audio(PIANO_AUDIO_FILE_TEMPLATE_URL.replace('%number%', String(props.tabIndex)))
    audio.current.addEventListener('canplaythrough', soundLoaded)
    audio.current.addEventListener('play', soundIsPlaying)
    audio.current.addEventListener('pause', soundIsPaused)
    return () => {
      if(!audio.current || !isLoaded) {
        return
      }
      audio.current.removeEventListener('canplaythrough', soundLoaded)
      audio.current.removeEventListener('play', soundIsPlaying)
      audio.current.removeEventListener('pause', soundIsPaused)
      clearTimeout(timeout)
    }
  }, [props.tabIndex, isLoaded])
  const playTone = useCallback(() => {
    if(!audio.current) {
      console.error(`Cannot play sound for key ${props.tabIndex}`)
      return
    }
    if(audio.current.currentTime > 0) {
      audio.current.pause()
      audio.current.currentTime = 0
    }
    audio.current.play()
  }, [props.tabIndex])

  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if(event.code !== listenKeyPressed) {
        return
      }
      playTone()
    }
    document.addEventListener('keydown', keyDownListener)
    return () => {
      document.removeEventListener('keydown', keyDownListener)
    }
  }, [listenKeyPressed, playTone])
  return <StyledKey
    $isPlaying={isPlaying}
    // $isPlaying={true}
    $isLoaded={isLoaded}
    $highlightedColor={highlightedColor}
    role="button"
    onClick={playTone}
    {...props}
  />
}

export const White = styled((props) => <Key highlightedColor='#ffd200' {...props}/>)`
  fill: white;
  &:hover {
    fill: #ffd200
  }
`
export const Black = styled((props) => <Key highlightedColor='#f40082' {...props}/>)`
  fill: black;
  &:hover {
    fill: #f40082
  }
`
