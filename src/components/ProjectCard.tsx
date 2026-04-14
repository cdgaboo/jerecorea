"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: {
    _id: string
    title: string
    titleEn?: string
    slug: string
    subtitle?: string
    subtitleEn?: string
    description?: string
    descriptionEn?: string
    imageUrl?: string
    hoverImageUrl?: string
    externalUrl?: string
    year?: string
  }
  priority?: boolean
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const href = project.externalUrl || `/proyectos/${project.slug}`
  const target = project.externalUrl ? '_blank' : undefined
  const desc = project.description || project.descriptionEn || ''
  const shortDesc = desc.length > 100 ? desc.slice(0, 97) + '…' : desc

  return (
    <Link
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      className="group block mb-8"
    >
      {/* Image Container */}
      <div className="relative mb-5 overflow-hidden aspect-square bg-surface border border-border/20">
        {project.imageUrl ? (
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Primary image */}
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1024}
              height={1024}
              quality={90}
              priority={priority}
              className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                project.hoverImageUrl ? 'group-hover:opacity-0' : ''
              }`}
            />

            {/* Hover image swap */}
            {project.hoverImageUrl && (
              <Image
                src={project.hoverImageUrl}
                alt={`${project.title} — detail`}
                width={1024}
                height={1024}
                quality={90}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
              />
            )}

            {/* Description overlay — slides up from bottom */}
            {shortDesc && (
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] overflow-hidden">
                <div className="bg-foreground/90 backdrop-blur-sm p-5 flex flex-col gap-3">
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: 'var(--background)' }}
                  >
                    {shortDesc}
                  </p>
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50 flex items-center gap-2"
                    style={{ color: 'var(--background)' }}
                  >
                    {project.externalUrl ? 'View Project' : 'See More'}
                    <span>→</span>
                  </span>
                </div>
              </div>
            )}

            {/* Subtle dark vignette on hover (no description case) */}
            {!shortDesc && (
              <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            )}
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] text-muted font-mono uppercase tracking-[0.2em]">Image Pending</span>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-[14px] leading-tight font-medium tracking-tight">
            {project.title}
            {project.titleEn && (
              <span className="text-muted font-normal text-[13px]"> / {project.titleEn}</span>
            )}
          </h3>
          <span className="text-[10px] font-mono text-muted/60 mt-0.5 shrink-0">
            {project.year || '2026'}
          </span>
        </div>

        {(project.subtitle || project.subtitleEn) && (
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] leading-tight text-muted uppercase tracking-[0.15em] font-medium">
              {project.subtitle}
            </p>
            {project.subtitleEn && (
              <p className="text-[9px] leading-tight text-muted/60 italic uppercase tracking-[0.1em]">
                {project.subtitleEn}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Expand line */}
      <div className="w-0 group-hover:w-full h-[1px] bg-foreground/20 mt-4 transition-all duration-700 ease-[0.16,1,0.3,1]" />
    </Link>
  )
}
