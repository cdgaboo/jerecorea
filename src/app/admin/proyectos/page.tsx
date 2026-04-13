'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'

interface Project {
  _id: string
  title: string
  slug: string
  subtitle?: string
  imageUrl?: string
  order?: number
  featured?: boolean
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const res = await fetch('/api/trpc/project.list', { headers: { 'Content-Type': 'application/json' } })
    const data = await res.json()
    const result = data.result?.data
    if (result) setProjects(result)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? This action cannot be undone.')) return
    await fetch('/api/trpc/project.delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchProjects()
  }

  if (loading) return <p className="text-muted font-mono text-sm uppercase tracking-widest">Loading...</p>

  return (
    <FadeIn>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-xl uppercase tracking-tight font-bold">Projects</h1>
        <Link href="/admin/proyectos/nuevo" className="font-mono text-[11px] uppercase tracking-widest bg-foreground text-background px-5 py-2.5 hover:opacity-80 transition-opacity">
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border">
          <p className="font-mono text-sm text-muted uppercase tracking-widest">No projects in the archive</p>
        </div>
      ) : (
        <div className="border border-border divide-y divide-border overflow-hidden">
          {projects.map((p) => (
            <div key={p._id} className="flex items-center justify-between p-4 gap-4 hover:bg-surface transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                {p.imageUrl && <Image src={p.imageUrl} alt="" width={48} height={48} className="object-cover shrink-0 grayscale hover:grayscale-0 transition-all" />}
                <div className="min-w-0">
                  <p className="font-mono text-sm truncate font-medium">{p.title}</p>
                  {p.subtitle && <p className="text-xs text-muted truncate">{p.subtitle}</p>}
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Link href={`/admin/proyectos/${p._id}/editar`} className="font-mono text-[11px] uppercase tracking-widest border border-border px-4 py-1.5 hover:border-foreground transition-colors">
                  Edit
                </Link>
                <button onClick={() => handleDelete(p._id)} className="font-mono text-[11px] uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </FadeIn>
  )
}
