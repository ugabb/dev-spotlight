import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <video autoPlay loop muted className='fixed -z-10 h-full w-full top-0 left-0 p-0 object-cover opacity-30'>
          <source src='/particles.mp4' />
        </video>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
