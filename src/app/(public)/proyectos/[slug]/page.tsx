import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { Project } from '@/lib/models'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  await connectDB()
  const project = (await Project.findOne({ slug }).lean()) as any

  if (!project) notFound()

  return (
    <article>
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Image src="/iconmonstr-cube-filled.svg" alt="" width={16} height={16} className="opacity-50" />
          <span className="font-mono text-xs text-muted uppercase tracking-wider">Proyecto</span>
        </div>
        <h1 className="font-mono text-2xl">{project.title}</h1>
        {project.subtitle && <p className="mt-2 text-muted">{project.subtitle}</p>}
      </header>

      {project.imageUrl && (
        <div className="mb-8 border border-border overflow-hidden">
          <Image src={project.imageUrl} alt={project.title} width={1200} height={900} className="w-full" />
        </div>
      )}

      {project.description && (
        <div className="max-w-2xl">
          <p className="whitespace-pre-line leading-relaxed text-muted">{project.description}</p>
        </div>
      )}

      {project.externalUrl && (
        <div className="mt-12 pt-8 border-t border-border">
          <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm underline underline-offset-4 flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            Visitar proyecto <span className="opacity-60">&nearr;</span>
          </a>
        </div>
      )}

      <Link href="/" className="mt-16 inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-foreground transition-colors">
        <span>&larr;</span> Volver al inicio
      </Link>
    </article>
  )
}
