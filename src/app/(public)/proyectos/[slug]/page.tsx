import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { Project } from '@/lib/models'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  await connectDB()
  const project = (await Project.findOne({ slug }).lean()) as any

  if (!project) notFound()

  return (
    <article className="pb-20">
      <header className="px-8 pt-40 pb-12">
        <FadeIn>
          <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Project Detail</span>
          <h1 className="text-[24px] mt-4 font-medium tracking-tight">
            {project.title}
            {project.titleEn && <span className="text-muted font-normal"> / {project.titleEn}</span>}
          </h1>
          {(project.subtitle || project.subtitleEn) && (
            <p className="text-[13px] text-muted mt-4 max-w-xl leading-relaxed">
              {project.subtitle}
              {project.subtitleEn && <span className="block opacity-60 mt-1 italic text-[12px]">{project.subtitleEn}</span>}
            </p>
          )}
        </FadeIn>
      </header>

      {project.imageUrl && (
        <FadeIn delay={0.1}>
          <div className="w-full px-8 mb-12">
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              width={1920} 
              height={1080} 
              className="w-full h-auto object-cover border border-border" 
              priority
            />
          </div>
        </FadeIn>
      )}

      <div className="px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 lg:col-span-6 space-y-8">
          {project.description && (
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <p className="text-[14px] leading-relaxed whitespace-pre-line">{project.description}</p>
                {project.descriptionEn && (
                  <p className="text-[13px] leading-relaxed text-muted whitespace-pre-line border-t border-border pt-6 mt-6 italic">
                    {project.descriptionEn}
                  </p>
                )}
              </div>
            </FadeIn>
          )}

          {project.externalUrl && (
            <FadeIn delay={0.3}>
              <div className="pt-4">
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors inline-block font-mono">
                  Launch Project <span className="ml-1">&nearr;</span>
                </a>
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {project.hoverImageUrl && (
        <FadeIn delay={0.4}>
          <div className="w-full px-8 mt-24">
            <Image 
              src={project.hoverImageUrl} 
              alt="Detail view" 
              width={1920} 
              height={1080} 
              className="w-full h-auto object-cover border border-border" 
            />
          </div>
        </FadeIn>
      )}

      <div className="px-8 pt-24 pb-12">
        <FadeIn delay={0.5}>
          <Link href="/" className="text-[13px] text-muted hover:text-foreground transition-colors font-mono uppercase tracking-widest flex items-center gap-2">
            <span className="text-xl -mt-1">&larr;</span> Back to work
          </Link>
        </FadeIn>
      </div>
    </article>
  )
}
