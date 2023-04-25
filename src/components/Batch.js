import React from 'react'
import { Table, Text, Link, Row, Image, Spacer } from '@nextui-org/react'
import Song, { getSongAsRow } from './Song'
import { GetPlaylistItemsResponse } from '../sample/GetPlaylistItems-response2'
import ReactAudioPlayer from 'react-audio-player'

function msToHMS(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? minutes : minutes
  seconds = seconds < 10 ? seconds : seconds

  if (hours > 0) return hours + ':' + minutes + ':' + seconds
  else return minutes + ':' + seconds
}

export default function Batch() {
  const tracks = GetPlaylistItemsResponse.items
  // console.log(tracks.forEach((t) => console.log(t)))

  // const song = GetPlaylistItemsResponse.items[0]
  // console.log(tracks)

  return (
    <Table
      aria-label="Results round 1"
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
    >
      <Table.Header>
        <Table.Column></Table.Column> {/* preview */}
        <Table.Column></Table.Column> {/* cover */}
        <Table.Column>Song</Table.Column>
        <Table.Column>Artist</Table.Column>
        <Table.Column>Duration</Table.Column>
        <Table.Column>Round 1 Score</Table.Column>
        <Table.Column>Round 2 Score</Table.Column>
        <Table.Column>Total</Table.Column>
      </Table.Header>
      <Table.Body>
        {/* what amount of data should we pass */}
        {/* TODO: need a domain model of a song? */}
        {/* {tracks.map((song, i) => getSongAsRow(song))} */}

        {tracks.map((song, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              {song.track.preview_url ? (
                <ReactAudioPlayer src={song.track.preview_url} controls />
              ) : (
                <></>
              )}
            </Table.Cell>

            <Table.Cell>
              <Image
                src={song.track.album.images[1].url}
                alt={song.track.name}
                width={80}
              />
            </Table.Cell>
            <Table.Cell>
              <Link target="_blank" href={song.track.external_urls.spotify}>
                {song.track.name}
              </Link>
              <Text>{song.track.album.name}</Text>
            </Table.Cell>
            <Table.Cell>
              {song.track.album.artists.map((x) => x.name).join(', ')}
            </Table.Cell>
            <Table.Cell>{msToHMS(song.track.duration_ms)}</Table.Cell>
            {/* TODO: pull these from the db if the date is > date where it should be available */}
            <Table.Cell>0</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>0</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
