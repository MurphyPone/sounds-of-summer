import { Container } from '@nextui-org/react'
import { useSession } from 'next-auth/react'

import Administration from '../components/Administration'
import NavBar from '../components/NavBar'

const Home = () => {
  const session = useSession()

  return (
    <Container>
      <NavBar session={session} />
      <Administration session={session} />
    </Container>
  )
}

export default Home
