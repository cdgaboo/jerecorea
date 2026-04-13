import type { Metadata } from 'next'
import { Bitcount_Prop_Single, Sora } from 'next/font/google'
import './globals.css'

const bitcount = Bitcount_Prop_Single({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bitcount',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'jerecorea',
  description: 'Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${bitcount.variable} ${sora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
