import { useState, useEffect } from 'react'
import { Container, Text, Row, useTheme, Spacer } from '@nextui-org/react'

const { draftSettings } = require('../../package.json')
export const admins = ['plotsmurphy']

export default function Administration({ session }) {
  const { theme } = useTheme()

  const [playlists, setPlaylists] = useState()

  async function getAllPlaylists() {
    let tmpPlaylists = []
    console.log('all participants: ', draftSettings.participants)
    for (let participant of draftSettings.participants) {
      await fetch(
        '/api/getPlaylist?' +
          new URLSearchParams({ key: `2023-${participant}` }),
        {
          method: 'GET',
        }
      )
        .then((res) => {
          return res.json()
        })
        .then((json) => {
          console.log('setting playlists from GetAllPlaylists in res: ', json)
          // Only set the json if it's not empty
          if (json != null) tmpPlaylists.push(json)
          else
            tmpPlaylists.push({
              name: 'not yet submitted',
              owner: { id: participant },
            })
          return json
        })
    }
    setPlaylists(tmpPlaylists)
  }

  // If the state is none, getAllPlaylists
  useEffect(() => {
    getAllPlaylists()
  }, [])

  // If the state is some, log about it
  useEffect(() => {
    console.log('playlists: ', playlists)
  }, [playlists])

  if (!playlists) return 'loading...'

  return (
    <Container>
      {console.log(session)}
      {!(session && admins.includes(session?.data?.token?.name)) ? (
        <Text h1>ur not sposed to be here</Text>
      ) : (
        <>
          <Text h1>Welcome to da Admin Zone</Text>
          <Container>
            <Text h2>Draft Settings</Text>
            <Container>
              <Row>
                <Text>Batch size: </Text>
                <Spacer />
                <Text color={theme.colors.primary.value}>
                  {draftSettings.batchSize}
                </Text>
              </Row>
              <Row>
                <Text>Cutoff Ratio: </Text>
                <Spacer />
                <Text color={theme.colors.primary.value}>
                  {draftSettings.cutoffRatio}
                </Text>
              </Row>
            </Container>
          </Container>
          <Container>
            <Text h2>Submissions</Text>
            <Container>
              {!playlists ? (
                <>awaiting playlist data</>
              ) : (
                playlists.map((curr, i) => (
                  <Row key={i}>
                    {curr.owner.id}: {curr.name} - {curr?.tracks?.items?.length}
                  </Row>
                ))
              )}
            </Container>
          </Container>
        </>
      )}
    </Container>
  )
}
