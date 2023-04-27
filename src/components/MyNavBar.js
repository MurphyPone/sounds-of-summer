import React from 'react'
import { styled, Navbar, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
// import { useSession } from '@supabase/auth-helpers-react'
import { useSession } from 'next-auth/react'
export const Box = styled('div', {
  boxSizing: 'border-box',
})

export const NavLayout = ({ children }) => (
  <Box css={{ maxW: '100%' }}>{children}</Box>
)

export default function MyNavBar() {
  const session = useSession()
  const { asPath } = useRouter()

  // tabs to only be displayed if auth'd
  const authedTabs = [
    {
      route: '/submission',
      display: 'Submission',
    },
    {
      route: '/round-one',
      display: 'Round 1',
    },
    {
      route: '/round-two',
      display: 'Round 2',
    },
    {
      route: '/results',
      display: 'Results',
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
          {/* Always display how it works */}
          <Navbar.Link
            isActive={asPath == '/how-it-works'}
            href="/how-it-works"
            key="how-it-works"
          >
            How it Works
          </Navbar.Link>

          {/* Display the auth'd tabs */}
          {session.status == 'authenticated' ? (
            <>
              {authedTabs.map((curr, i) => (
                <Navbar.Link
                  isActive={asPath == curr.route}
                  href={curr.route}
                  key={i}
                >
                  {curr.display}
                </Navbar.Link>
              ))}
            </>
          ) : (
            <></>
          )}
          {/* Always show account option to login */}
          <Navbar.Link isActive={asPath == '/'} href="/" key="index">
            Account
          </Navbar.Link>
        </Navbar.Content>
      </Navbar>
    </NavLayout>
  )
}
