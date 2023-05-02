import { Container, useTheme } from '@nextui-org/react'

export default function Layout({ children }) {
  const { theme } = useTheme()

  return <Container>{children}</Container>
}
