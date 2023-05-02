import React from 'react'
import {
  Container,
  Button,
  Text,
  Row,
  useTheme,
  Spacer,
} from '@nextui-org/react'
// import SpotifyAuth from '../components/SpotifyAuth'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Account() {
  const { data: session } = useSession()
  const { theme } = useTheme()

  return (
    <Container>
      {session ? (
        <Container>
          <Row justify="center">
            <Text h1>welcome </Text>
          </Row>
          <Row justify="center">
            <Text h1 color={theme.colors.primary.value}>
              {/* {console.log(session)} */}
              {session.token.name}
            </Text>
          </Row>
          <Row justify="center">
            <Text>are you ready to motherfucking rock?</Text>
          </Row>
          <Spacer y={2} />
          <Row justify="center">
            <Button size="md" onClick={() => signOut()}>
              Sign out
            </Button>
          </Row>
        </Container>
      ) : (
        <>
          <Spacer y={10} />
          <Row justify="center">
            <Button size="xl" onClick={() => signIn()}>
              Sign in
            </Button>
          </Row>
        </>
      )}
    </Container>
  )
}
