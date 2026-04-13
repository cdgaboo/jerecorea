import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 border-r border-border bg-background p-6 flex flex-col gap-6">
        <Link href="/" className="font-mono text-sm font-medium flex items-center gap-2">
          jerecorea
        </Link>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin" className="px-3 py-2 rounded hover:bg-foreground/5 transition-colors">Dashboard</Link>
          <Link href="/admin/proyectos" className="px-3 py-2 rounded hover:bg-foreground/5 transition-colors">Proyectos</Link>
          <Link href="/admin/configuracion" className="px-3 py-2 rounded hover:bg-foreground/5 transition-colors">Configuración</Link>
        </nav>
      </aside>
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
}
