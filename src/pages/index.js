import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Container } from '@nextui-org/react'

import { useSession, signIn, signOut } from 'next-auth/react'

import Account from '../components/Account'
import NavBar from '../components/NavBar'

const Home = () => {
  const session = useSession()
  // const supabase = useSupabaseClient()

  return (
    <Container>
      <NavBar session={session} />
      <Account session={session} theme={{ colorScheme: 'dark' }} />
    </Container>
  )
}

export default Home
