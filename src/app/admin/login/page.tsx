'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Invalid credentials. Access denied.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-10">

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[10px] opacity-30">✦</span>
            <span className="text-[12px] font-mono uppercase tracking-[0.2em] opacity-40">jerecorea—sys</span>
          </div>
          <h1 className="text-[28px] font-bold tracking-[-0.06em] uppercase leading-none">
            System<br />
            <span className="opacity-30 italic">Access</span>
          </h1>
          <p className="text-[11px] font-mono text-muted uppercase tracking-widest pt-2">
            Restricted area — Authorized personnel only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
              User ID
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="w-full bg-transparent border border-border/60 px-4 py-3 text-[13px] font-mono focus:outline-none focus:border-foreground transition-colors placeholder:text-muted/40"
              placeholder="username"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
              Auth Key
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full bg-transparent border border-border/60 px-4 py-3 text-[13px] font-mono focus:outline-none focus:border-foreground transition-colors placeholder:text-muted/40"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[11px] font-mono text-red-500 uppercase tracking-widest py-2 border-l-2 border-red-500 pl-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-foreground text-background py-3.5 text-[11px] font-mono uppercase tracking-[0.2em] hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-background animate-ping" />
                Authenticating...
              </>
            ) : (
              <>
                <span>Authenticate</span>
                <span className="opacity-40">→</span>
              </>
            )}
          </button>
        </form>

        <div className="border-t border-border/30 pt-6 flex justify-between items-center">
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
            Secured with JWT · HttpOnly
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Online
          </span>
        </div>
      </div>
    </div>
  )
}
