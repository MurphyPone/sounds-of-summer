import '../styles/globals.css'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { SessionProvider } from 'next-auth/react'

import { useState } from 'react'
import Layout from '@/components/Layout'

// 2. Call `createTheme` and pass your custom values
const theme = createTheme({
  type: 'dark', // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient:
        'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#4ADE7B',

      // you can also create your own color
      myColor: '#4ADE7B',

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
})

function MyApp({ Component, pageProps: { session, pageProps } }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionProvider session={session}>
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  )
}
export default MyApp
