import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

// TODO: probably narrow down these scopes
const scopes = [
  'playlist-read-private',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read',
]

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      // put the goodies from the full JWT context onto the token
      async jwt({ token, account, profile, user }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account) {
          token.accessToken = account.access_token
          token.id = profile.id
        }
        return token
      },
      // move shit from the token I get from jwt() onto the session for easier access
      async session({ session, token, user }) {
        session.user = user
        session.token = token
        return session
      },
    },
    secret: process.env.SPOTIFY_CLIENT_SECRET,
    theme: {
      colorScheme: 'dark',
    },
  })

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     Spotify({
//       clientId: process.env.SPOTIFY_CLIENT_ID,
//       clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//       authorization:
//         'https://accounts.spotify.com/authorize?scope=user-read-email',
//       authorization: `https://accounts.spotify.com/authorize?scope=${scopes.join(
//         '%20'
//       )}`,
//     }),
//   ],
//   theme: {
//     colorScheme: 'dark',
//   },
//   secret: process.env.SPOTIFY_CLIENT_SECRET,
// }
// export default NextAuth(authOptions)
