import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

import {
  styled,
  Container,
  Row,
  Spacer,
  Button,
  Input,
  Text,
  Image,
  Link,
  Table,
} from '@nextui-org/react'
import SpotifyWebApi from 'spotify-web-api-js/src/spotify-web-api'

import NavBar from '../components/NavBar'
import ProgressBar from '../components/ProgressBar'
import Batch, { msToHMS } from '../components/Batch'
import { getSongAsRow } from '../components/Song'

const { draftSettings } = require('../../package.json')
const spotify = new SpotifyWebApi()

function checkSongLength(songs) {
  if (songs.tracks.items.length > draftSettings.batchSize) {
    return 'your playlist is too long btw'
  } else if (songs.tracks.items.length < draftSettings.batchSize) {
    return 'your playlist is too long btw'
  }
  return 'nice, 25 songs'
}

export default function Submission() {
  const session = useSession()
  const [playlistInput, setPlaylistInput] = useState('')
  const [songs, setSongs] = useState()

  function chopFullURL(url) {
    if (url.startsWith('https://open.spotify.com/playlist/')) {
      const chopped = url.substring(url.lastIndexOf('/') + 1)
      // console.log(chopped)
      setPlaylistInput(chopped)
    } else {
      setPlaylistInput(url)
    }
  }

  // TODO: probably don't need the whole session
  async function getPlaylist(session) {
    // check if startsWith the https thing, just take the ID
    console.log('session: ', session)
    const token = session.data?.token.accessToken
    console.log('token in getPlaylist: ', token)
    console.log('input: ', playlistInput)
    if (token) {
      spotify.setAccessToken(token)
      await spotify.getPlaylist(playlistInput).then((data) => {
        console.log(data)
        setSongs(data)
      })
    } else {
      console.log('NO TOKEN: ', token)
    }
  }

  // TODO: move this to a BE function
  const openDate = new Date(draftSettings.schedule.open)
  const submissionDate = new Date(draftSettings.schedule.submission)

  return (
    <Container>
      <NavBar session={session} />
      {/* If we don't yet have an auth'd session, serve the login page */}
      {/* TODO: prolly move this auth check to a Container type deal */}
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
        />
      ) : (
        // TODO: If the user has already submitted a playlist, then hide this and show their submission
        <Container display="flex">
          <Spacer y={10} />
          <Row justify="center" align="center">
            <Input
              underlined
              color="primary"
              label={`paste the ID of your spotify playlist with ${draftSettings.batchSize} songs`}
              labelLeft="https://open.spotify.com/playlist/"
              placeholder="2utjwWZnVjfAv2Helpzz69"
              width="80%"
              size="md"
              onChange={(e) => {
                chopFullURL(e.target.value)
              }}
              value={playlistInput || '2utjwWZnVjfAv2Helpzz69'}
              contentRightStyling={false}
              contentRight={
                <Button
                  size={'sm'}
                  width={300}
                  onPress={() => {
                    getPlaylist(session)
                  }}
                >
                  Save
                </Button>
              }
            />
          </Row>
          <Spacer y={2} />
          {/* TODO: move this to a  */}
          <ProgressBar
            startDate={openDate}
            endDate={submissionDate}
            endLabel={'Submission deadline'}
          />
        </Container>
      )}

      {/* TODO: if users playlist is present, pull it in */}
      {/* If results for user, then display, otherwise don't */}
      {!songs ? (
        <Container>submit some shit</Container>
      ) : (
        <Container>
          {checkSongLength(songs)}
          <Row>
            <Text h1>{songs.name}</Text>
          </Row>
          <Row>
            <Text>{songs.description}</Text>
          </Row>
          <Table
            aria-label={songs.name}
            css={{
              height: 'auto',
              minWidth: '100%',
            }}
          >
            <Table.Header>
              <Table.Column></Table.Column> {/* cover */}
              <Table.Column>Song</Table.Column>
              <Table.Column>Artist</Table.Column>
              <Table.Column>Duration</Table.Column>
            </Table.Header>
            <Table.Body>
              {songs.tracks.items.map((curr, i) => (
                <Table.Row key={i}>
                  <Table.Cell>
                    <Row>
                      <Text h3>{i}</Text>
                      <Image
                        src={curr.track.album.images[1].url}
                        alt={curr.track.name}
                        width={80}
                      />
                    </Row>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      target="_blank"
                      href={curr.track.external_urls.spotify}
                    >
                      {curr.track.name}
                    </Link>
                    <Text>{curr.track.album.name}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    {curr.track.album.artists.map((x) => x.name).join(', ')}
                  </Table.Cell>
                  <Table.Cell>{msToHMS(curr.track.duration_ms)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      )}
      {/* <Batch /> */}
    </Container>
  )
}
