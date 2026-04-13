'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ id: '', title: '', slug: '', subtitle: '', description: '', imageUrl: '', externalUrl: '', order: 0, featured: false })

  useEffect(() => {
    (async () => {
      const { id } = await params
      const res = await fetch(`/api/trpc/project.get?input=${JSON.stringify({ slug: id })}`)
      const data = await res.json()
      const result = data.result?.data
      if (result) {
        const p = JSON.parse(result.json)
        setFormData({ id: p._id, title: p.title, slug: p.slug, subtitle: p.subtitle || '', description: p.description || '', imageUrl: p.imageUrl || '', externalUrl: p.externalUrl || '', order: p.order || 0, featured: p.featured || false })
      }
      setLoading(false)
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/trpc/project.update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: formData }),
    })
    router.push('/admin/proyectos')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title, slug: slugify(title) }))
  }

  if (loading) return <p className="text-muted font-mono text-sm">Cargando...</p>

  return (
    <div>
      <h1 className="font-mono text-xl mb-8">Editar proyecto</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div>
          <label className="font-mono text-xs text-muted">Título *</label>
          <input required value={formData.title} onChange={e => handleTitleChange(e.target.value)} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted">Slug</label>
          <input value={formData.slug} onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted">Subtítulo</label>
          <input value={formData.subtitle} onChange={e => setFormData(p => ({ ...p, subtitle: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted">URL de imagen</label>
          <input value={formData.imageUrl} onChange={e => setFormData(p => ({ ...p, imageUrl: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted">Descripción</label>
          <textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} rows={4} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground resize-none" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted">URL externa</label>
          <input value={formData.externalUrl} onChange={e => setFormData(p => ({ ...p, externalUrl: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted">Orden</label>
          <input type="number" value={formData.order} onChange={e => setFormData(p => ({ ...p, order: Number(e.target.value) }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={formData.featured} onChange={e => setFormData(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
          <label className="text-sm">Destacado</label>
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="font-mono text-sm bg-foreground text-background px-6 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <Link href="/admin/proyectos" className="font-mono text-sm text-muted hover:text-foreground px-4 py-2">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
