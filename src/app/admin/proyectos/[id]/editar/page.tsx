'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ id: '', title: '', slug: '', subtitle: '', description: '', titleEn: '', subtitleEn: '', descriptionEn: '', imageUrl: '', hoverImageUrl: '', externalUrl: '', order: 0, featured: false })

  useEffect(() => {
    (async () => {
      const { id } = await params
      const res = await fetch(`/api/trpc/project.get?input=${JSON.stringify({ slug: id })}`)
      const data = await res.json()
      const result = data.result?.data
      if (result) {
        const p = result
        setFormData({ 
          id: p._id, 
          title: p.title, 
          slug: p.slug, 
          subtitle: p.subtitle || '', 
          description: p.description || '', 
          titleEn: p.titleEn || '', 
          subtitleEn: p.subtitleEn || '', 
          descriptionEn: p.descriptionEn || '', 
          imageUrl: p.imageUrl || '', 
          hoverImageUrl: p.hoverImageUrl || '', 
          externalUrl: p.externalUrl || '', 
          order: p.order || 0, 
          featured: p.featured || false 
        })
      }
      setLoading(false)
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/trpc/project.update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      router.push('/admin/proyectos')
    } else {
      const errorData = await res.json()
      console.error('Update error:', errorData)
      alert('Error al actualizar el proyecto. Verifica los datos e intenta de nuevo.')
      setSaving(false)
    }
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title, slug: slugify(title) }))
  }

  if (loading) return <p className="text-muted font-mono text-sm">Cargando...</p>

  return (
    <FadeIn className="pb-20">
      <h1 className="font-mono text-xl mb-8">Editar proyecto</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-border bg-neutral-50/50 rounded-lg">
          <div className="col-span-full font-mono text-[10px] uppercase tracking-widest text-muted border-b border-border pb-2 mb-2">Información Básica</div>
          <div>
            <label className="font-mono text-xs text-muted">Título (ES) *</label>
            <input required value={formData.title} onChange={e => handleTitleChange(e.target.value)} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
          </div>
          <div>
            <label className="font-mono text-xs text-muted">Slug</label>
            <input value={formData.slug} onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground pointer-events-none opacity-50" tabIndex={-1} />
          </div>
          <div>
            <label className="font-mono text-xs text-muted">Subtítulo (ES)</label>
            <input value={formData.subtitle} onChange={e => setFormData(p => ({ ...p, subtitle: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
          </div>
          <div className="col-span-full">
            <label className="font-mono text-xs text-muted">Descripción (ES)</label>
            <textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground resize-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-border bg-neutral-50/50 rounded-lg">
          <div className="col-span-full font-mono text-[10px] uppercase tracking-widest text-muted border-b border-border pb-2 mb-2">English Info</div>
          <div>
            <label className="font-mono text-xs text-muted">Title (EN)</label>
            <input value={formData.titleEn} onChange={e => setFormData(p => ({ ...p, titleEn: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
          </div>
          <div>
            <label className="font-mono text-xs text-muted">Subtitle (EN)</label>
            <input value={formData.subtitleEn} onChange={e => setFormData(p => ({ ...p, subtitleEn: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
          </div>
          <div className="col-span-full">
            <label className="font-mono text-xs text-muted">Description (EN)</label>
            <textarea value={formData.descriptionEn} onChange={e => setFormData(p => ({ ...p, descriptionEn: e.target.value }))} rows={3} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground resize-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-border bg-neutral-50/50 rounded-lg">
          <div className="col-span-full font-mono text-[10px] uppercase tracking-widest text-muted border-b border-border pb-2 mb-2">Multimedia & Links</div>
          <div>
            <label className="font-mono text-xs text-muted">URL Imagen Principal</label>
            <input value={formData.imageUrl} onChange={e => setFormData(p => ({ ...p, imageUrl: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
          </div>
          <div>
            <label className="font-mono text-xs text-muted">URL Imagen Hover</label>
            <input value={formData.hoverImageUrl} onChange={e => setFormData(p => ({ ...p, hoverImageUrl: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
          </div>
          <div className="col-span-full">
            <label className="font-mono text-xs text-muted">URL Externa (e.g. Behance, Instagram)</label>
            <input value={formData.externalUrl} onChange={e => setFormData(p => ({ ...p, externalUrl: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 p-4 border border-border bg-neutral-50/50 rounded-lg">
          <div>
            <label className="font-mono text-xs text-muted">Orden</label>
            <input type="number" value={formData.order} onChange={e => setFormData(p => ({ ...p, order: Number(e.target.value) }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
          </div>
          <div className="flex items-end pb-2.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
              <span className="text-sm">Destacado</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="font-mono text-[11px] uppercase tracking-widest bg-foreground text-background px-10 py-4 rounded-full hover:scale-[1.02] transition-all disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
          <Link href="/admin/proyectos" className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-foreground px-6 py-4 flex items-center">Cancelar</Link>
        </div>
      </form>
    </FadeIn>
  )
}
