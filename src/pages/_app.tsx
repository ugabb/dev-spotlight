import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: {...pageProps
} }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}