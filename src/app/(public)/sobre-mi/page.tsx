import { connectDB } from '@/lib/db'
import mongoose from 'mongoose'
import Image from 'next/image'

export default async function AboutPage() {
  await connectDB()
  const db = mongoose.connection.db
  const settings = await db?.collection('settings').findOne({})
  const aboutText = settings?.aboutText
  const socialLinks = settings?.socialLinks || []

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Image src="/iconmonstr-window-multiple-filled.svg" alt="" width={20} height={20} className="opacity-60" />
        <h1 className="font-mono text-xl">Sobre mí</h1>
      </div>

      {aboutText ? (
        <div className="max-w-2xl">
          <p className="whitespace-pre-line leading-relaxed text-muted">{aboutText}</p>
        </div>
      ) : (
        <div className="py-16 text-center">
          <Image src="/iconmonstr-screen-size-increase-filled.svg" alt="" width={48} height={48} className="mx-auto opacity-20 mb-4" />
          <p className="font-mono text-sm text-muted">Sin contenido aún</p>
        </div>
      )}

      {socialLinks.length > 0 && (
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-6">
            {socialLinks.map((link: any) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm underline underline-offset-4 text-muted hover:text-foreground transition-colors flex items-center gap-1"
              >
                {link.label}
                <span className="opacity-40">&nearr;</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
