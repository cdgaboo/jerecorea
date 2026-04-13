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
    if (!confirm('¿Eliminar este proyecto?')) return
    await fetch('/api/trpc/project.delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchProjects()
  }

  if (loading) return <p className="text-muted font-mono text-sm">Cargando...</p>

  return (
    <FadeIn>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-xl">Proyectos</h1>
        <Link href="/admin/proyectos/nuevo" className="font-mono text-sm bg-foreground text-background px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
          + Nuevo proyecto
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border rounded-xl">
          <p className="font-mono text-sm text-muted">No hay proyectos registrados</p>
        </div>
      ) : (
        <div className="border border-border divide-y divide-border rounded-xl overflow-hidden bg-white">
          {projects.map((p) => (
            <div key={p._id} className="flex items-center justify-between p-4 gap-4 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                {p.imageUrl && <Image src={p.imageUrl} alt="" width={48} height={48} className="rounded object-cover shrink-0 grayscale hover:grayscale-0 transition-all" />}
                <div className="min-w-0">
                  <p className="font-mono text-sm truncate font-medium">{p.title}</p>
                  {p.subtitle && <p className="text-xs text-muted truncate">{p.subtitle}</p>}
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Link href={`/admin/proyectos/${p._id}/editar`} className="font-mono text-xs bg-neutral-100 px-3 py-1 rounded hover:bg-neutral-200 transition-colors">Editar</Link>
                <button onClick={() => handleDelete(p._id)} className="font-mono text-xs text-red-500 hover:text-red-700">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </FadeIn>
  )
}
