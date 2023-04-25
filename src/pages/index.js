import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Container } from '@nextui-org/react'

import Account from '../components/Account'
import MyNavBar from '../components/MyNavBar'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Container>
      <MyNavBar />
      {/* If we don't yet have an auth'd session, serve the login page */}
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
        />
      ) : (
        // otherwise, serve the site
        // TODO: move this to a dahsboard container component
        <Account session={session} />
      )}
    </Container>
  )
}

export default Home
