import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2">
          <Image src="/iconmonstr-cube-filled.svg" alt="" width={14} height={14} className="opacity-40" />
          <p className="font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} jerecorea
          </p>
        </div>
      </div>
    </footer>
  )
}
