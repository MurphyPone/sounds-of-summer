import React from 'react'
import { styled, Navbar, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useSession } from '@supabase/auth-helpers-react'
import { admins } from '../components/Administration'
export const Box = styled('div', {
  boxSizing: 'border-box',
})

export const NavLayout = ({ children }) => (
  <Box css={{ maxW: '100%' }}>{children}</Box>
)

export default function MyNavBar() {
  const session = useSession()
  const { asPath } = useRouter()

  const tabs = [
    {
      route: '/how-it-works',
      display: 'How it Works',
      isActive: false,
    },
    {
      route: '/submission',
      display: 'Submission',
      isActive: false,
    },
    {
      route: '/round-one',
      display: 'Round 1',
      isActive: false,
    },
    {
      route: '/round-two',
      display: 'Round 2',
      isActive: false,
    },
  ]

  return (
    <NavLayout>
      <Navbar variant={'sticky'} id={'poo'}>
        <Navbar.Brand>
          <Text b hideIn="xs">
            Sounds of Summer
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          {tabs.map((item, i) => (
            <Navbar.Link
              isActive={asPath == item.route}
              href={item.route}
              key={i}
            >
              {item.display}
            </Navbar.Link>
          ))}

          {/* <Navbar.Link isActive href="/how-it-works">
            How It Works
          </Navbar.Link>
          <Navbar.Link href="/submission">Submission</Navbar.Link>
          <Navbar.Link href="/round-one">Round 1</Navbar.Link>
          <Navbar.Link href="/round-two">Round 2</Navbar.Link> */}
          {/* TODO: only display the admin zone if user is admin */}
          {session && admins.includes(session.user.email) ? (
            <Navbar.Link isActive={asPath == '/admin'} href="/admin">
              Admin Zone
            </Navbar.Link>
          ) : (
            <></>
          )}
        </Navbar.Content>
      </Navbar>
    </NavLayout>
  )
}
