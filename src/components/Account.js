import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import {
  Container,
  Button,
  Text,
  Row,
  useTheme,
  Spacer,
} from '@nextui-org/react'
// import SpotifyAuth from '../components/SpotifyAuth'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Account() {
  const { data: session } = useSession()
  const { theme } = useTheme()

  return (
    <Container display="flex">
      {session ? (
        <>
          <Row justify="center">
            <Text h1>welcome, </Text>
            <Text h1 color={theme.colors.primary.value}>
              {session.user.name}
            </Text>
          </Row>
          <Row justify="center">
            <Text>are you ready to motherfucking rock?</Text>
          </Row>
          {console.log(session)}
          <Spacer y={2} />
          <Row justify="center">
            <Button size="md" onClick={() => signOut()}>
              Sign out
            </Button>
          </Row>
        </>
      ) : (
        <>
          <Spacer y={10} />
          <Row justify="center">
            <Button size="xl" onClick={() => signIn()}>
              Sign in
            </Button>
          </Row>
        </>
      )}
    </Container>
  )
}

// export default function Account({ session }) {
//   const supabase = useSupabaseClient()
//   const user = useUser() // helps pull the user from our session
//   const [loading, setLoading] = useState(true)
//   const [username, setUsername] = useState(null)
//   const [website, setWebsite] = useState(null)
//   const [avatar_url, setAvatarUrl] = useState(null)

//   // once we have a session, we get profile info from our db
//   useEffect(() => {
//     getProfile()
//   }, [session])

//   async function getProfile() {
//     try {
//       setLoading(true)

//       // from profiles table, pull these columns
//       let { data, error, status } = await supabase
//         .from('profiles')
//         .select(`username, website, avatar_url`)
//         .eq('id', user.id) // only pull row that corresponds to the current user
//         .single()

//       if (error && status !== 406) {
//         throw error
//       }

//       if (data) {
//         setUsername(data.username)
//         setWebsite(data.website)
//         setAvatarUrl(data.avatar_url)
//       }
//     } catch (error) {
//       alert('Error loading user data!')
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function updateProfile({ username, website, avatar_url }) {
//     try {
//       setLoading(true)

//       const updates = {
//         id: user.id,
//         username,
//         website,
//         avatar_url,
//         updated_at: new Date().toISOString(),
//       }

//       let { error } = await supabase.from('profiles').upsert(updates)
//       if (error) throw error
//       alert('Profile updated!')
//     } catch (error) {
//       alert('Error updating the data!')
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Container>
//       <div className="form-widget">
//         <div>
//           <label htmlFor="email">Email</label>
//           <input id="email" type="text" value={session.user.email} disabled />
//         </div>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             type="text"
//             value={username || ''}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="website">Website</label>
//           <input
//             id="website"
//             type="url"
//             value={website || ''}
//             onChange={(e) => setWebsite(e.target.value)}
//           />
//         </div>

//         <Button
//           onClick={() => updateProfile({ username, website, avatar_url })}
//           disabled={loading}
//         >
//           {loading ? 'Loading ...' : 'Update'}
//         </Button>
//         <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
//         <SpotifyAuth session={session} />
//       </div>
//     </Container>
//   )
// }
