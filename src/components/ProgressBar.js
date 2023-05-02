import React from 'react'
import { Row, Text, Progress, Container } from '@nextui-org/react'

// TODO: probably belongs in a util function somewhere
const remap = function (n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

export default function ProgressBar({
  startDate,
  startLabel,
  endLabel,
  endDate,
}) {
  const now = new Date()
  const progress = remap(
    now.getTime(),
    startDate.getTime(),
    endDate.getTime(),
    0,
    100
  )
  return (
    <Container>
      <Row>
        <Progress color="primary" value={progress} />
      </Row>

      <Row justify="space-between">
        <Text>{startDate.toDateString()}</Text>
        <Text>{endDate.toDateString()}</Text>
      </Row>
      <Row justify="space-between">
        <Text size={'$sm'} color={'gray'}>
          {startLabel}
        </Text>
        <Text size={'$sm'} color={'gray'}>
          {endLabel}
        </Text>
      </Row>
    </Container>
  )
}
