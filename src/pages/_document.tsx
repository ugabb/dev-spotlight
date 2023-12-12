import { Html, Head, Main, NextScript } from 'next/document'
import { ProfileProvider } from '@/components/ProfileProvider'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Dev-Spotlight</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </Head>
      <body>
        <ProfileProvider>
          <Main />
        </ProfileProvider>
        <NextScript />
      </body>
    </Html>
  )
}
