import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'jerecorea',
  description: 'Portfolio',
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
