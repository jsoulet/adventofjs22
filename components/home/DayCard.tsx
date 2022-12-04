import styled, {css} from 'styled-components'
import Link from 'next/link'

const CardTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 3.5rem;
  background: #2C6C73;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  border: 1px solid #FFFEF9;
  
  border-radius: 10px;
`
const CardDetails = styled.p`
  font-size: 2rem;
  background: #D84150;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #FFFEF9;
  box-shadow: 0 0 20px #FFFEF9;
  border-radius: 10px;
`

interface DayCardProps{
  title: string,
  details?: string,
  href: string,
}

const CardRoot = styled(Link)<{ disabled: boolean}>`
  text-align: left;
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 300px;
  position: relative;
  ${CardTitle}, ${CardDetails} {
    position: absolute;
    top: 0;
    transition: transform 500ms ease-in, box-shadow 1000ms linear;
    backface-visibility: hidden;
  }
  ${CardTitle} {
    transform: rotateY(0deg);
  }
  ${CardDetails} {
    transform: rotateY(180deg);
  }
  ${(props) => {
    if(!props.disabled) {
      return css`
        &:hover,
        &:focus,
        &:active {
          outline: none;
          ${CardTitle} {
            transform: rotateY(180deg);
          }
          ${CardDetails} {
            transform: rotateY(0deg);
            box-shadow: 0 0 20px rgba(255, 254, 249, 0.7);
          }
        }
      `
    }

    return css`
        ${CardTitle} {
          background: #5D6B7B;
          color: #B0BAC4;
          border-color: #B0BAC4;
        }
      `
  }}
`


const DayCard: React.FC<DayCardProps> = ({title, details, ...props}) => {
  return <CardRoot disabled={!Boolean(props.href)} aria-disabled={!Boolean(props.href)} {...props}>
    <>
      <CardTitle>{title}</CardTitle>
      <CardDetails>{details}</CardDetails>
    </>
  </CardRoot>
}

export default DayCard