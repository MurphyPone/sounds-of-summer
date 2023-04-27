import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Container } from '@nextui-org/react'

import { useSession, signIn, signOut } from 'next-auth/react'

import Account from '../components/Account'
import MyNavBar from '../components/MyNavBar'

const Home = () => {
  const session = useSession()
  // const supabase = useSupabaseClient()

  return (
    <Container>
      <MyNavBar />
      <Account session={session} theme={{ colorScheme: 'dark' }} />
    </Container>
  )
}

export default Home
