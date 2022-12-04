import Head from 'next/head'
import styled from 'styled-components'

interface Props {
  title: string
}
const Page = styled(({title, ...props}: Props) => {
  return <>
    {title && <Head>{title}</Head>}
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

export default Page