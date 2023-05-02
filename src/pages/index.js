import { Container } from '@nextui-org/react'
import { useSession } from 'next-auth/react'

import Account from '../components/Account'
import NavBar from '../components/NavBar'

const Home = () => {
  const session = useSession()

  return (
    <Container>
      <NavBar session={session} />
      <Account session={session} theme={{ colorScheme: 'dark' }} />
    </Container>
  )
}

export default Home
