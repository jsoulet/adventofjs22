import { useState, useEffect } from "react"
import { Episode } from "../../../types/multiselect"
import getElementCheckedStatus from './getElementCheckedStatus'
import {Element as CheckElement} from './getElementCheckedStatus'

const useCheckedEpisodes = (episodes: Episode[]) => {
  const [isPressingMaj, setIsPressingMaj] = useState(false)
  const [lastChecked, setLastChecked] = useState<CheckElement | undefined>(undefined)
  const [checkedEpisodes, setCheckedEpisodes] = useState(episodes.map(ep => ({
    ...ep,
    checked: false
  })))
  const onClickEpisode = (id: number) => {
    const clickedElement = checkedEpisodes.find((ep) => ep.id === id)
    if(!clickedElement) {
      return
    }
    setCheckedEpisodes(episodes => episodes.map(ep => (
      {
        ...ep,
        checked: getElementCheckedStatus(
          ep,
          {
            id: clickedElement.id,
            checked: clickedElement.checked
          },
          lastChecked,
          isPressingMaj),
    })))
    setLastChecked(clickedElement)
    
  }
  useEffect(() => {
    const handleKeyChange = (isPressed: boolean) => (e: KeyboardEvent) => {
      if(!['MajLeft', 'MajRight'].includes(e.code)) {
        return
      }
      setIsPressingMaj(isPressed)
    }
    const handleKeyDown = handleKeyChange(true)
    const handleKeyUp = handleKeyChange(false)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  })
  return {
    checkedEpisodes,
    onClickEpisode,
  }
}
export default useCheckedEpisodes