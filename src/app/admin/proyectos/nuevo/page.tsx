'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function NewProjectPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '', slug: '', subtitle: '', description: '', titleEn: '', subtitleEn: '', descriptionEn: '', imageUrl: '', hoverImageUrl: '', externalUrl: '', year: '', order: 0, featured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/trpc/project.create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      router.push('/admin/proyectos')
    } else {
      const errorData = await res.json()
      console.error('Save error details:', JSON.stringify(errorData, null, 2))
      alert('Error saving project. Check the browser console for details.')
      setSaving(false)
    }
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title, slug: slugify(title) }))
  }

  const fieldClass = "w-full mt-1 px-3 py-2.5 border border-border bg-background text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
  const labelClass = "font-mono text-[10px] uppercase tracking-[0.15em] text-muted"
  const sectionClass = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-border bg-surface/30"

  return (
    <FadeIn className="pb-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-xl uppercase tracking-tight font-bold">New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className={sectionClass}>
          <div className="col-span-full font-mono text-[10px] uppercase tracking-[0.2em] text-muted border-b border-border pb-3 mb-2">
            Basic Info
          </div>
          <div>
            <label className={labelClass}>Title (ES) *</label>
            <input required value={formData.title} onChange={e => handleTitleChange(e.target.value)} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Slug (auto-generated)</label>
            <input value={formData.slug} onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))} className={`${fieldClass} pointer-events-none opacity-40`} tabIndex={-1} />
          </div>
          <div>
            <label className={labelClass}>Subtitle (ES)</label>
            <input value={formData.subtitle} onChange={e => setFormData(p => ({ ...p, subtitle: e.target.value }))} className={fieldClass} />
          </div>
          <div className="col-span-full">
            <label className={labelClass}>Description (ES)</label>
            <textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} rows={3} className={`${fieldClass} resize-none`} />
          </div>
        </div>

        <div className={sectionClass}>
          <div className="col-span-full font-mono text-[10px] uppercase tracking-[0.2em] text-muted border-b border-border pb-3 mb-2">
            English Content
          </div>
          <div>
            <label className={labelClass}>Title (EN)</label>
            <input value={formData.titleEn} onChange={e => setFormData(p => ({ ...p, titleEn: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Subtitle (EN)</label>
            <input value={formData.subtitleEn} onChange={e => setFormData(p => ({ ...p, subtitleEn: e.target.value }))} className={fieldClass} />
          </div>
          <div className="col-span-full">
            <label className={labelClass}>Description (EN)</label>
            <textarea value={formData.descriptionEn} onChange={e => setFormData(p => ({ ...p, descriptionEn: e.target.value }))} rows={3} className={`${fieldClass} resize-none`} />
          </div>
        </div>

        <div className={sectionClass}>
          <div className="col-span-full font-mono text-[10px] uppercase tracking-[0.2em] text-muted border-b border-border pb-3 mb-2">
            Media & Links
          </div>
          <div>
            <label className={labelClass}>Main Image URL</label>
            <input value={formData.imageUrl} onChange={e => setFormData(p => ({ ...p, imageUrl: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Hover Image URL</label>
            <input value={formData.hoverImageUrl} onChange={e => setFormData(p => ({ ...p, hoverImageUrl: e.target.value }))} className={fieldClass} />
          </div>
          <div className="col-span-full">
            <label className={labelClass}>External URL (e.g. Behance, Instagram)</label>
            <input value={formData.externalUrl} onChange={e => setFormData(p => ({ ...p, externalUrl: e.target.value }))} className={fieldClass} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 p-6 border border-border bg-surface/30">
          <div>
            <label className={labelClass}>Display Order</label>
            <input type="number" value={formData.order} onChange={e => setFormData(p => ({ ...p, order: Number(e.target.value) }))} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Year</label>
            <input value={formData.year} onChange={e => setFormData(p => ({ ...p, year: e.target.value }))} placeholder="2025" className={fieldClass} />
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
              <span className="font-mono text-[11px] uppercase tracking-widest">Featured</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={saving} className="btn-solid font-mono text-[11px] uppercase tracking-widest px-10 py-4 disabled:opacity-40">
            {saving ? 'Saving...' : 'Save Project'}
          </button>
          <Link href="/admin/proyectos" className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-foreground px-6 py-4 flex items-center transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </FadeIn>
  )
}
