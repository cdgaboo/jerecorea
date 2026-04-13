import { connectDB } from '@/lib/db'
import { Project } from '@/lib/models'
import Link from 'next/link'

export default async function AdminDashboard() {
  await connectDB()
  const projectCount = await Project.countDocuments()
  
  const recentActions = [
    { label: "Create Project", href: "/admin/proyectos/nuevo", color: "bg-blue-500" },
    { label: "Manage Content", href: "/admin/proyectos", color: "bg-purple-500" },
    { label: "System Config", href: "/admin/configuracion", color: "bg-orange-500" },
  ]

  return (
    <div className="space-y-12 max-w-5xl">
      <header className="space-y-2">
        <h1 className="text-[24px] font-bold tracking-tighter uppercase italic">Administrative / Dashboard</h1>
        <p className="text-[12px] text-muted max-w-md leading-relaxed">
          Welcome back. All architectural systems are operational. You have {projectCount} documented artifacts in the system.
        </p>
      </header>

      <div className="grid gap-1 grid-cols-1 md:grid-cols-3 bg-border/20 border border-border/40 overflow-hidden">
        <div className="bg-background p-8 space-y-4">
          <span className="text-[10px] uppercase tracking-widest text-muted">Total Artifacts</span>
          <p className="text-5xl font-bold tracking-tighter leading-none">{projectCount}</p>
          <div className="h-1 w-8 bg-foreground" />
        </div>
        
        <div className="bg-background p-8 space-y-4 md:col-span-2 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-widest text-muted">Quick Integration</span>
          <div className="flex flex-wrap gap-4">
            {recentActions.map((action) => (
              <Link 
                key={action.label}
                href={action.href}
                className="px-6 py-2 border border-border/60 text-[11px] uppercase tracking-widest hover:border-foreground transition-all duration-300 flex items-center gap-3 group"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${action.color}`} />
                <span>{action.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-6 pt-12 border-t border-border/40">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-[14px] font-bold uppercase tracking-widest">System Health</h2>
            <p className="text-[10px] text-muted font-mono">LATENCY: 24ms / DB-CONN: ACTIVE</p>
          </div>
          <div className="text-[10px] text-muted uppercase italic">Archive Version 1.0.4 — © 2026</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border border-border/40 space-y-4">
            <h3 className="text-[11px] font-bold uppercase">Public Presence</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono border-b border-border/20 pb-2">
                <span className="text-muted italic">Portfolio Visibility</span>
                <span className="text-green-500 font-bold uppercase">Public</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono border-b border-border/20 pb-2">
                <span className="text-muted italic">Maintenance Mode</span>
                <span className="text-muted font-bold uppercase">Disabled</span>
              </div>
            </div>
          </div>
          <div className="p-6 border border-border/40 space-y-4">
            <h3 className="text-[11px] font-bold uppercase">Last Sync</h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-border/60 flex items-center justify-center">
                <span className="text-[14px]">↻</span>
              </div>
              <div>
                <p className="text-[12px] font-bold">Automatic Backup Succeeded</p>
                <p className="text-[10px] text-muted font-mono uppercase">Status 200 / 07:44 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
