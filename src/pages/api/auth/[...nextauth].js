import NextAuth from 'next-auth'
import Spotify from 'next-auth/providers/spotify'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'dark',
  },
  secret: process.env.SPOTIFY_CLIENT_SECRET,
  // callbacks: {
  //   session: async (session, user) => {
  //     if (session?.user) {
  //       session.user.id = user.id
  //     }
  //     return session
  //   },
  // },
}
export default NextAuth(authOptions)
