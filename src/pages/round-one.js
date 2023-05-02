import { useSession } from 'next-auth/react'
import { Container, Text } from '@nextui-org/react'
import Batch from '../components/Batch'
import NavBar from '../components/NavBar'

const RoundOne = () => {
  const session = useSession()

  return (
    <Container>
      <NavBar session={session} />
      <Text h1>Results from round 1</Text>
      {/* Call some BE function to read from db */}
      <Batch />
    </Container>
  )
}

export default RoundOne
