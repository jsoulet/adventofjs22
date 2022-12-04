import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  border-radius: 50%;
  box-shadow: -5px 14px 44px #000000, 5px -16px 50px rgba(255, 255, 255, 0.15);
  display: flex;
  height: 518px;
  justify-content: center;
  position: relative;
  width: 518px;
`

const Ring = styled.div<{isEnding: boolean}>`
    position: absolute;
    left: 0;
    stroke: #900A0A;
    top: 0;
    z-index: 1;
    ${(props) => props.isEnding ? css`
      & circle {
        stroke: #09A65A;
        
      }
    `: ''}   
`

const Timer = styled.div`
    align-items: center;
    background: radial-gradient(71.4% 71.4% at 51.7% 28.6%, #3A393F 0%, #17171A 100%);
    border-radius: 50%;
    box-shadow: inset 0px 0px 114px rgba(0, 0, 0, 0.45);
    color: white;
    display: flex;
    flex-direction: column;
    height: 500px;
    justify-content: center;
    position: relative;
    width: 500px;
    z-index: 2;
`
const Time = styled.div`
    display: flex;
    font-family: "bebas";
    font-size: 196px;
    margin: 30px auto;
    position: relative;
    top: 30px;
`
const InputText = styled.input`
  border: 0;
  border-bottom: 1px dashed white;
  background: none;
  color: white;
  font-family: "bebas";
  font-size: 196px;
  height: 170px;
  width: 150px;
  text-align: center;
  outline: none;
  ${(props) => props.disabled && css`border-bottom: none;`}
`
const Minutes = styled.div``
const Colon = styled.div``
const Seconds = styled.div``
const Start = styled.button`
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  letter-spacing: 10px;
  line-height: 20px;
  background: none;
  color: white;
  opacity: .5;
  border: none;
  text-transform: uppercase;
  margin-bottom: 20px;
  &:hover {
    opacity: 1;
  }
`
const Settings = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`

const PROGESS_RADIUS = 254
const computeTimerProgess = (
  initialTimer: { seconds: number, minutes: number },
  currentTimer: { seconds: number, minutes: number }
) => {
  var circumference = Math.PI*(PROGESS_RADIUS*2);
  const initialValue = initialTimer.minutes * 60 + initialTimer.seconds
  const currentValue = currentTimer.minutes * 60 + currentTimer.seconds
  if(currentValue === 0) {
    return 0
  }
  const remainingPercentage = (initialValue - currentValue) / initialValue
  return remainingPercentage * circumference
}

const Pomodoro = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [initialTimer, setInitialTimer] = useState({
    minutes: 15,
    seconds: 0
  })
  const [isCounting, setIsCounting] = useState(false)
  const [timer, setTimer] = useState({
    minutes: 15,
    seconds: 0
  })
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const handleStartCounting = () => {
    setTimer(initialTimer)
    setIsEditing(false)
    setIsCounting(true)
  }
  const handleStopCounting = () => {
    setIsCounting(false)
    clearInterval(intervalRef.current)
  }
  const handleToggleTimer = () => {
    if(isCounting) {
      handleStopCounting()
      return
    }
    handleStartCounting()
  }
  const handleChangeSeconds = (newSeconds: number) => setInitialTimer((timer) =>  ({...timer, seconds: newSeconds}))
  const handleChangeMinutes = (newMinutes: number) => setInitialTimer((timer) =>  ({...timer, minutes: newMinutes}))
  const formatNumberWith2Digits = (value: number) => value.toLocaleString('en-GB', {minimumIntegerDigits: 2})
  useEffect(() => {
    if(!isCounting) {
      return
    }
    intervalRef.current = setInterval(() => {
      const newSeconds = timer.seconds !== 0 ? timer.seconds - 1 : 59
      const newMinutes = newSeconds === 59 ?  timer.minutes - 1 : timer.minutes
      if(newSeconds === 0 && newMinutes === 0) {
        handleStopCounting()  
      }
      setTimer({
        minutes: newMinutes,
        seconds: newSeconds
      })
    }, 1000)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [isCounting, timer])
  const hasTimerEnded = timer.seconds === 0 && timer.minutes === 0
  const strokeDashoffset = computeTimerProgess(initialTimer, timer)
  return <Wrapper>
    <Ring isEnding={hasTimerEnded}>
      <svg width={518} height={518} viewBox="0 0 518 518">
        <circle
          strokeWidth="9px"
          x={0}
          y="y"
          cx={259}
          cy={259}
          r={PROGESS_RADIUS}
          strokeDashoffset={strokeDashoffset}
          stroke-dasharray="1596"
        />
      </svg>
    </Ring>
    <Timer>
      <Time>
        <Minutes>
          <InputText
            type="text"
            value={formatNumberWith2Digits(isEditing ? initialTimer.minutes: timer.minutes)} disabled={!isEditing}
            onChange={(e) => handleChangeMinutes(Number(e.target.value))}
          />
        </Minutes>
        <Colon>:</Colon>
        <Seconds>
          <InputText
            type="text"
            value={formatNumberWith2Digits(isEditing ? initialTimer.seconds: timer.seconds)} disabled={!isEditing}
            onChange={(e) => handleChangeSeconds(Number(e.target.value))}
          />
        </Seconds>
      </Time>
      <Start onClick={handleToggleTimer}>{isCounting ? 'stop' : 'start'}</Start>
      <Settings onClick={() => { setIsEditing((isEditing) => !isEditing)}}>
        <Image src="/images/gear.svg" alt="Settings" height={32} width={32}/>
      </Settings>
    </Timer>
  </Wrapper>
}

export default Pomodoro