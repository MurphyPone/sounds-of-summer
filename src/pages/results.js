import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Container, Text } from '@nextui-org/react'
import Batch from '../components/Batch'
import NavBar from '../components/NavBar'

const RoundTwo = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

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
