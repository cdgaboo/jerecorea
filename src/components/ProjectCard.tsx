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

  return (
    <Link 
      href={href} 
      target={target} 
      rel={target ? 'noopener noreferrer' : undefined} 
      className="group block mb-8"
    >
      <div className="relative mb-5 overflow-hidden aspect-square bg-[#f0f0f0] border border-border/20">
        {project.imageUrl ? (
          <motion.div 
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1024}
              height={1024}
              quality={90}
              priority={priority}
              className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${project.hoverImageUrl ? 'group-hover:opacity-0' : ''}`}
            />
            {project.hoverImageUrl && (
              <Image
                src={project.hoverImageUrl}
                alt={`${project.title} hover view`}
                width={1024}
                height={1024}
                quality={90}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
              />
            )}
           

            <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#f0f0f0]">
            <span className="text-[10px] text-muted font-mono uppercase tracking-[0.2em]">Image Pending</span>
          </div>
        )
        }
      </div>

      <div className="flex flex-col gap-2 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-[14px] leading-tight font-medium tracking-tight">
            {project.title}
            {project.titleEn && <span className="text-muted font-normal text-[13px]"> / {project.titleEn}</span>}
          </h3>
          <span className="text-[10px] font-mono text-muted/60 mt-1">
            {project.year || "2026"}
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
      

      <div className="w-0 group-hover:w-full h-[1px] bg-foreground/20 mt-4 transition-all duration-700 ease-[0.16, 1, 0.3, 1]" />
    </Link>
  )
}
