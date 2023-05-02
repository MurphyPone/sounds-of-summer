import React from 'react'
import { styled, Navbar, Text, Row, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'

import AuthFilter from '../components/AuthFilter'
import CalendarFilter from '../components/CalendarFilters'
const { draftSettings } = require('../../package.json')

const Box = styled('div', {
  boxSizing: 'border-box',
  maxW: '100%',
  vw: '100%',
  // position: 'absolute',
  // left: 'calc(-50vw + 50%)',
})

const Layout = ({ children }) => <Box>{children}</Box>

export default function NavBar({ session }) {
  const { asPath } = useRouter()

  // tabs to only be displayed if auth'd
  const authedTabs = [
    {
      route: '/submission',
      display: 'Submission',
      openDate: draftSettings.schedule.open,
    },
    {
      route: '/round-one',
      display: 'Round 1',
      openDate: draftSettings.schedule.submission,
    },
    {
      route: '/round-two',
      display: 'Round 2',
      openDate: draftSettings.schedule.round1,
    },
    {
      route: '/results',
      display: 'Results',
      openDate: draftSettings.schedule.round2,
    },
  ]

  return (
    <Layout>
      <Navbar variant={'floating'} id={'poo'}>
        <Navbar.Brand>
          <AuthFilter>
            <Navbar.Toggle aria-label="toggle navigation" />
          </AuthFilter>
          <Text b>Sounds of Summer</Text>
        </Navbar.Brand>
        <Navbar.Content variant="underline">
          {/* Always display how it works */}
          <Navbar.Link
            isActive={asPath == '/how-it-works'}
            href="/how-it-works"
            key="how-it-works"
          >
            About
          </Navbar.Link>
        </Navbar.Content>
        {/* Display the auth'd tabs */}
        <AuthFilter>
          <Navbar.Collapse>
            {authedTabs.map((curr, i) => (
              // Only display the relevant tabs in terms of calendar
              <CalendarFilter date={curr.openDate} debug={false} key={i}>
                <Row key={i}>
                  <Navbar.CollapseItem
                    as={Link}
                    isActive={asPath == curr.route}
                    href={curr.route}
                    key={i}
                  >
                    {curr.display}
                  </Navbar.CollapseItem>
                </Row>
              </CalendarFilter>
            ))}
          </Navbar.Collapse>
        </AuthFilter>

        {/* TODO: probably always want to show results behind the calendar filter */}

        {/* Always show account option to login */}
        <Navbar.Content variant="underline">
          <Navbar.Item as={Link} isActive={asPath == '/'} href="/" key="index">
            Account
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
  )
}
