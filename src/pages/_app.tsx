import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Toaster } from '@/components/ui/toaster'
import ToasterContext from '@/context/ToasterProvider'

export default function App({ Component, pageProps: { session, ...pageProps
} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToasterContext/>
    </SessionProvider>
  )
}
