'use client'

import { useState, useEffect } from 'react'
import FadeIn from '@/components/FadeIn'

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
        const s = result
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
      body: JSON.stringify(formData),
    })
    setSaving(false)
    alert('Settings saved successfully.')
  }

  const addSocialLink = () => setFormData(p => ({ ...p, socialLinks: [...p.socialLinks, { label: '', url: '' }] }))
  const removeSocialLink = (i: number) => setFormData(p => ({ ...p, socialLinks: p.socialLinks.filter((_, idx) => idx !== i) }))

  if (!loaded) return <p className="text-muted font-mono text-sm uppercase tracking-widest">Loading...</p>

  const fieldClass = "w-full mt-1 px-3 py-2.5 border border-border bg-background text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
  const labelClass = "font-mono text-[10px] uppercase tracking-[0.15em] text-muted"

  return (
    <FadeIn className="pb-20">
      <h1 className="font-mono text-xl uppercase tracking-tight font-bold mb-8">Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div className="p-6 border border-border bg-surface/30 space-y-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted border-b border-border pb-3">
            General
          </div>
          <div>
            <label className={labelClass}>Site Name</label>
            <input value={formData.siteName} onChange={e => setFormData(p => ({ ...p, siteName: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Tagline</label>
            <input value={formData.tagline} onChange={e => setFormData(p => ({ ...p, tagline: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>About Text</label>
            <textarea value={formData.aboutText} onChange={e => setFormData(p => ({ ...p, aboutText: e.target.value }))} rows={6} className={`${fieldClass} resize-none`} />
          </div>
        </div>

        <div className="p-6 border border-border bg-surface/30 space-y-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted border-b border-border pb-3">
            Social Links
          </div>
          {formData.socialLinks.map((link, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder="Label"
                value={link.label}
                onChange={e => { const links = [...formData.socialLinks]; links[i].label = e.target.value; setFormData(p => ({ ...p, socialLinks: links })) }}
                className={`${fieldClass} flex-1 mt-0`}
              />
              <input
                placeholder="URL"
                value={link.url}
                onChange={e => { const links = [...formData.socialLinks]; links[i].url = e.target.value; setFormData(p => ({ ...p, socialLinks: links })) }}
                className={`${fieldClass} flex-1 mt-0`}
              />
              {formData.socialLinks.length > 1 && (
                <button type="button" onClick={() => removeSocialLink(i)} className="px-3 text-red-500 hover:text-red-400 text-sm transition-colors">&times;</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSocialLink} className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors">
            + Add Link
          </button>
        </div>

        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={saving} className="btn-solid font-mono text-[11px] uppercase tracking-widest px-10 py-4 disabled:opacity-40">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </FadeIn>
  )
}
