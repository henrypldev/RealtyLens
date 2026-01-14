import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { constructMetadata } from '@/lib/constructMetadata'
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

// const outfit = Outfit({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });
const _geist = Geist({ variable: '--font-sans', subsets: ['latin'] })

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="AW-11543766872" />
      <body
        className={`${_geist.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
