'use client'

import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    siteName: 'jerecorea',
    tagline: '',
    aboutText: '',
    socialLinks: [{ label: '', url: '' }] as { label: string; url: string }[],
  })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/trpc/settings.get')
      const data = await res.json()
      const result = data.result?.data
      if (result) {
        const s = JSON.parse(result.json)
        setFormData({
          siteName: s.siteName || 'jerecorea',
          tagline: s.tagline || '',
          aboutText: s.aboutText || '',
          socialLinks: s.socialLinks?.length ? s.socialLinks : [{ label: '', url: '' }],
        })
      }
      setLoaded(true)
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/trpc/settings.save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: formData }),
    })
    setSaving(false)
    alert('Guardado')
  }

  const addSocialLink = () => setFormData(p => ({ ...p, socialLinks: [...p.socialLinks, { label: '', url: '' }] }))
  const removeSocialLink = (i: number) => setFormData(p => ({ ...p, socialLinks: p.socialLinks.filter((_, idx) => idx !== i) }))

  if (!loaded) return <p className="text-muted font-mono text-sm">Cargando...</p>

  return (
    <div>
      <h1 className="font-mono text-xl mb-8">Configuración</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div>
          <label className="font-mono text-xs text-muted">Nombre del sitio</label>
          <input value={formData.siteName} onChange={e => setFormData(p => ({ ...p, siteName: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted">Tagline</label>
          <input value={formData.tagline} onChange={e => setFormData(p => ({ ...p, tagline: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted">Texto About</label>
          <textarea value={formData.aboutText} onChange={e => setFormData(p => ({ ...p, aboutText: e.target.value }))} rows={6} className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground resize-none" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted mb-2 block">Links sociales</label>
          {formData.socialLinks.map((link, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input placeholder="Label" value={link.label} onChange={e => { const links = [...formData.socialLinks]; links[i].label = e.target.value; setFormData(p => ({ ...p, socialLinks: links })) }} className="flex-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
              <input placeholder="URL" value={link.url} onChange={e => { const links = [...formData.socialLinks]; links[i].url = e.target.value; setFormData(p => ({ ...p, socialLinks: links })) }} className="flex-1 px-3 py-2 border border-border bg-background text-sm rounded focus:outline-none focus:border-foreground" />
              {formData.socialLinks.length > 1 && (
                <button type="button" onClick={() => removeSocialLink(i)} className="px-3 text-red-500 text-sm">&times;</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSocialLink} className="font-mono text-xs text-muted hover:text-foreground mt-1">+ Agregar link</button>
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="font-mono text-sm bg-foreground text-background px-6 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}
