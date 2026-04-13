import { connectDB } from '@/lib/db'
import { Project } from '@/lib/models'
import ProjectCard from '@/components/ProjectCard'
import FadeIn from '@/components/FadeIn'
import * as motion from "framer-motion/client"

export default async function HomePage() {
  await connectDB()
  const projectsRaw = await Project.find().sort({ order: 1 }).lean()
  const projects = JSON.parse(JSON.stringify(projectsRaw))

  return (
    <div className="pt-24 lg:pt-32">
      <section className="px-8 md:px-12 pb-24 border-b border-border/40 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none -z-10 overflow-hidden">
          <span className="text-[20vw] font-bold text-foreground/[0.02] whitespace-nowrap leading-none tracking-tighter uppercase select-none">
            Jerecorea Creative Jerecorea Creative
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 lg:col-span-3">
            <FadeIn>
              <div className="space-y-12">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono">01 / Index</span>
                  <p className="text-[13px] font-medium tracking-tight">BRAND & VISUAL<br />DEVELOPMENT</p>
                </div>
                
                <div className="space-y-4 pt-12 border-t border-border/20">
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-muted uppercase">
                    <span>Year</span>
                    <span className="text-foreground">2026</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-muted uppercase">
                    <span>Focus</span>
                    <span className="text-foreground">AUTOMOTIVE / STREETSTYLE</span>
                  </div>
                  <div className="pt-8">
                    <a 
                      href="mailto:jgalcorea@gmail.com" 
                      className="group flex items-center justify-between text-[11px] uppercase tracking-[0.2em] py-3 border-b border-border/40 hover:border-foreground transition-all duration-500"
                    >
                      <span className="font-medium">Let&apos;s Talk</span>
                      <span className="text-[16px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
                        &nearr;
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-8">
                <h1 className="text-[14vw] md:text-[11vw] leading-[0.85] font-bold tracking-[-0.06em] uppercase">
                  Creative<br />
                  <span className="flex items-start md:items-center gap-4 md:gap-8">
                    <span className="inline-block w-[15vw] h-[1px] bg-foreground mt-[0.5em] md:mt-0" />
                    Engineering
                  </span>
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 md:mt-0">
                  <div />
                  <p className="text-[15px] md:text-[18px] leading-relaxed tracking-tight max-w-lg">
                    A graphic designer focusing on creative engineering. Crafting authentic 
                    liveries, stickers, and brand identities with a raw streetstyle aesthetic and automotive soul.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 py-32 border-b border-border/40">
        <header className="flex justify-between items-end mb-24">
          <FadeIn>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono italic">Selected — Work</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">RELEVANT PROJECTS</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="hidden md:block">
            <span className="text-[12px] font-mono text-muted uppercase tracking-[0.1em]">
              Currently displaying — {projects.length} artifacts
            </span>
          </FadeIn>
        </header>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-y-24 gap-x-8 md:gap-x-12">
            {(projects as any[]).map((p, idx) => (
              <motion.div
                key={String(p._id)}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        ) : (
          <FadeIn delay={0.2}>
            <p className="text-[13px] text-muted font-mono italic">The technical archive is currently empty...</p>
          </FadeIn>
        )}
      </section>

      <section className="px-8 md:px-12 py-40 bg-foreground text-background">
        <div className="max-w-4xl">
          <FadeIn>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-12 block font-mono italic">Available for collaborations — 2026</span>
            <h2 className="text-[10vw] md:text-[8vw] leading-[0.9] font-bold tracking-tighter uppercase mb-20">
              LET&apos;S ENGINEER<br />
              <span className="opacity-40 italic">YOUR VISION</span>
            </h2>
            
            <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between pt-12">
              <a 
                href="mailto:jgalcorea@gmail.com" 
                style={{ backgroundColor: '#ffffff', color: '#111111' }}
                className="inline-flex items-center justify-center text-[13px] md:text-[14px] font-bold uppercase tracking-[0.2em] px-10 md:px-12 py-4 md:py-5 rounded-full transition-all duration-500 shadow-xl hover:bg-opacity-90"
              >
                Inquire / Project Start
              </a>
              
              <div className="flex flex-wrap gap-8 text-[12px] uppercase tracking-widest font-mono">
                <a href="https://www.behance.net/jerecorea" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Behance</a>
                <a href="https://www.instagram.com/rcrs.dev?igsh=MXYxa3NkMTdzNmRxZg==" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Instagram</a>
                <a href="https://x.com/jerecorea" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">X (Twitter)</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
