import NextAuth from 'next-auth'
import Spotify from 'next-auth/providers/spotify'

// TODO: probably narrow down these scopes
const scopes = [
  'playlist-read-private',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read',
]

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email',
      authorization: `https://accounts.spotify.com/authorize?scope=${scopes.join(
        '%20'
      )}`,
    }),
  ],
  theme: {
    colorScheme: 'dark',
  },
  secret: process.env.SPOTIFY_CLIENT_SECRET,
}
export default NextAuth(authOptions)
