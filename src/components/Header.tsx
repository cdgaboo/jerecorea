import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm font-medium flex items-center gap-2">
          <Image src="/iconmonstr-cube-filled.svg" alt="" width={18} height={18} className="opacity-70" />
          jerecorea
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/sobre-mi" className="text-sm text-muted hover:text-foreground transition-colors">
            Sobre mí
          </Link>
        </nav>
      </div>
    </header>
  )
}
