import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navLinks = [
    { name: "Dashboard", href: "/admin" },
    { name: "Projects", href: "/admin/proyectos" },
    { name: "Settings", href: "/admin/configuracion" },
  ]

  return (
    <div className="min-h-screen flex bg-background text-foreground font-mono">
      {/* Refined Admin Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-background flex flex-col h-screen fixed">
        <div className="p-8 border-b border-border/40">
          <Link href="/" className="text-[14px] font-bold tracking-[-0.05em] flex items-center gap-2 group">
            <span className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity">✦</span>
            <span>jerecorea—sys</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="px-4 py-3 text-[12px] uppercase tracking-widest rounded-sm hover:bg-foreground hover:text-background transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-border/40">
          <Link 
            href="/" 
            className="text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            ← View Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen bg-[#fcfcfc]">
        <header className="h-20 border-b border-border/40 px-12 flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Management / System</span>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="opacity-40 uppercase">Authorized Access</span>
          </div>
        </header>
        
        <div className="p-12">
          {children}
        </div>
      </main>
    </div>
  )
}
