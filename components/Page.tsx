import Head from 'next/head'
import styled from 'styled-components'

interface Props {
  title: string,
  children: React.ReactNode
}
const StyledPage = styled(({title, ...props}: Props) => {
  return <>
    <Head><title>{title}</title></Head>
    <main {...props}></main>
  </>
})`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  min-width: 100vw;
  min-height: 100vh;
`

const Page = () => {
  
}

export default StyledPage