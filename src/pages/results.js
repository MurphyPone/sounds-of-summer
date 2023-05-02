import { useSession, signIn, signOut } from 'next-auth/react'
import { Container, Text } from '@nextui-org/react'
import Batch from '../components/Batch'
import NavBar from '../components/NavBar'

const RoundTwo = () => {
  const session = useSession()

  return (
    <Container>
      <NavBar session={session} />
      <Text h1>Final Results</Text>
      {/* Call some BE function to read from db */}
      <Batch />
    </Container>
  )
}

export default RoundTwo
