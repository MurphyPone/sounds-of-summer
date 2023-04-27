import { useState, useEffect } from 'react'
import { Container, Text, Row, useTheme, Spacer } from '@nextui-org/react'

const { draftSettings } = require('../../package.json')
export const admins = ['petersmurphy7@yahoo.com']

export default function Administration({ session }) {
  const { theme } = useTheme()

  return (
    <Container>
      {!(session && admins.includes(session.user.email)) ? (
        <Text h1>ur not sposed to be here</Text>
      ) : (
        <>
          <Text h1>Welcome to da Admin Zone</Text>
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
        </>
      )}
    </Container>
  )
}
