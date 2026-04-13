import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  project: {
    _id: string
    title: string
    slug: string
    subtitle?: string
    imageUrl?: string
    externalUrl?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const href = project.externalUrl || `/proyectos/${project.slug}`
  const target = project.externalUrl ? '_blank' : undefined

  return (
    <Link href={href} target={target} rel={target ? 'noopener noreferrer' : undefined} className="group block">
      <div className="overflow-hidden border border-border">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={768}
            height={576}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="aspect-[4/3] w-full bg-foreground/5 flex items-center justify-center">
            <Image src="/iconmonstr-screen-size-increase-filled.svg" alt="" width={48} height={48} className="opacity-20" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-mono text-sm flex items-center gap-2">
          {project.title}
          {project.externalUrl && <span className="opacity-40">&nearr;</span>}
        </h3>
        {project.subtitle && <p className="mt-1 text-xs text-muted">{project.subtitle}</p>}
      </div>
    </Link>
  )
}
