// A song probably has a couple views right
// voting in batch view should probably be a batch row

import React from 'react'
import { Table, Link } from '@nextui-org/react'

// Implied that this should be called in a BatchContainer
// track should be some json
export default function Song({ track: {} }) {
  return (
    <Table.Row key={track.id}>
      <Table.Cell>round 1 score</Table.Cell>
      <Table.Cell>round 1 score</Table.Cell>
      <Table.Cell>round 1 score</Table.Cell>
      <Table.Cell>round 1 score</Table.Cell>
      <Table.Cell>current score</Table.Cell>
    </Table.Row>
  )
}

export function getSongAsRow({ track }) {
  return (
    <Table.Row key={track.id}>
      <Table.Cell>{track.name}</Table.Cell>
      <Table.Cell>{track?.album?.artists[0].name}</Table.Cell>
      <Table.Cell>{track.album?.name}</Table.Cell>
      <Table.Cell>round 1 score</Table.Cell>
      <Table.Cell>current score</Table.Cell>
    </Table.Row>
  )
}
