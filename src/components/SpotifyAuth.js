import { useState, useEffect } from 'react'
// const SpotifyWebApi = require('spotify-web-api-js')
import SpotifyWebApi from 'spotify-web-api-js/src/spotify-web-api'

import {
  Container,
  Button,
  Text,
  Link,
  Row,
  Input,
  useTheme,
  Spacer,
} from '@nextui-org/react'

const authEndpoint = 'https://accounts.spotify.com/authorize'
const redirectURI = 'http://localhost:3000/'
const clientId = 'cfdbb3a977dd449fb024cc36884fcf41'

// TODO: probably narrow down these scopes
const scopes = [
  'playlist-read-private',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read',
]

export const spotifyLoginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`

const spotify = new SpotifyWebApi()

const SpotifyAuth = ({ session }) => {
  const [token, setToken] = useState('')
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if (!token && hash) {
      let maybeToken = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        ?.split('=')[1]

      if (maybeToken) token = maybeToken
      else token = ''

      window.location.hash = ''
      window.localStorage.setItem('token', token)
      console.log('spotify token: ', token)
      spotify.setAccessToken(token)
    }

    setToken(token ? token : '')

    if (!songs) {
      getRecent()
    }
  }, [])

  // TODO: this belongs elsewhere
  const getRecent = async () => {
    const playlistId = '2lLYtyqOB9Qz6L809J9S59'
    await spotify.getPlaylist(playlistId).then(
      (data) => {
        setSongs(data.tracks.items)
        // console.log(data)
        console.log('songs: ', songs)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  return (
    <Container justify="center">
      {!token ? (
        // <Button href={spotifyLoginURL}>Login to Spotify</Button>

        <Link href={spotifyLoginURL} target="_blank">
          login
        </Link>
      ) : (
        <Container>
          <Button
            onClick={() => {
              setToken('')
              window.localStorage.removeItem('token')
            }}
          >
            Logout of Spotify
          </Button>
          <Button onClick={() => getRecent()}>getRecent</Button>
        </Container>
      )}

      {songs ? (
        songs.map((curr, i) => <Text key={i}>{curr.track.name}</Text>)
      ) : (
        <Text>no songs</Text>
      )}
    </Container>
  )
}

export default SpotifyAuth
