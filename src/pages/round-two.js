import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Container, Text } from '@nextui-org/react'
import Batch from '../components/Batch'
import MyNavBar from '../components/MyNavBar'

const RoundTwo = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Container>
      <MyNavBar />
      <Text h1>Results from round 2</Text>
      {/* Call some BE function to read from db */}
      <Batch />
    </Container>
  )
}

export default RoundTwo
