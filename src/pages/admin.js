import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Administration from '../components/Administration'
import MyNavBar from '../components/MyNavBar'
import { Container } from '@nextui-org/react'

const Admin = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Container>
      <MyNavBar />
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
        />
      ) : (
        <Administration session={session} />
      )}
    </Container>
  )
}

export default Admin
