import { connectDB } from '@/lib/db'
import mongoose from 'mongoose'
import FadeIn from '@/components/FadeIn'
import * as motion from "framer-motion/client"

export default async function AboutPage() {
  await connectDB()
  const db = mongoose.connection.db
  const settings = await db?.collection('settings').findOne({})
  
  const aboutText = `Passionate, Learner, Self-Taught Graphic Designer.
With almost 5 years of experience (and counting) developing with charm and care stunning visuals for social figures/media/entrepreneurs in growing grounds such as esports, content creation and hardware.

For all over the world from San José, Costa Rica.
My main goal — to reflect and mirror the creativity that God gave to us to share and embrace.`

  const experience = [
    { role: "Junior Graphic Designer", company: "Nigma Galaxy", location: "United Arab Emirates", date: "Feb 2022 — Dec" },
    { role: "Creative Director & Graphic Designer", company: "Invasion Gamer Chile", location: "Santiago, Chile", date: "Jan 2021 — Apr 2021" },
    { role: "Creative direction and General Design", company: "Nox Esports UK", location: "London, United Kingdom", date: "Feb 2021 — Present" },
    { role: "Graphic Designer & Creative Director", company: "Noticed Legends", location: "USA", date: "Sep 2021 — Jan 2022" },
    { role: "Creative Director & Graphic Designer", company: "Black Lion", location: "Mexico", date: "May 2020 — Jun 2020" },
    { role: "Graphic Designer", company: "Sly Gaming", location: "Mexico", date: "Jan 2019 — Mar 2020" },
  ]

  const skills = ["Adobe After Effects", "Adobe Photoshop", "Aseprite", "Camera Raw", "DaVinci Resolve"]
  const languages = [
    { lang: "Spanish", level: "Native" },
    { lang: "English", level: "Spoken" }
  ]

  return (
    <div className="pt-32 pb-40 px-8 md:px-12">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
        <div className="md:col-span-4 lg:col-span-3">
          <FadeIn>
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono italic">Identity / Archive</span>
                <div className="space-y-1">
                  <h1 className="text-[20px] font-bold tracking-tighter uppercase italic leading-tight">
                    Jeremy Geovanni<br />Alvarado Corea
                  </h1>
                  <p className="text-[12px] opacity-60 uppercase tracking-widest">Student, Graphic Designer</p>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-[11px] font-mono text-muted uppercase tracking-widest">
                <span>San José, Costa Rica</span>
                <span className="opacity-40">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} — Local</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="md:col-span-8 lg:col-span-7">
          <FadeIn delay={0.1}>
            <div className="space-y-8">
              <div className="text-[18px] md:text-[24px] leading-tight font-medium tracking-tight whitespace-pre-line space-y-6">
                <p>{aboutText}</p>
                <p className="text-[14px] font-mono opacity-40 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Design, Pixel-art, Creative engineering.
                </p>
              </div>
              
              <div className="pt-12">
                <a 
                  href="mailto:jgalcorea@gmail.com" 
                  className="group flex items-center justify-between text-[13px] uppercase tracking-[0.2em] py-4 border-b border-border hover:border-foreground transition-all duration-700"
                >
                  <span className="font-bold">Inquiries / jgalcorea@gmail.com</span>
                  <span className="text-[18px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-700">
                    &nearr;
                  </span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-40 pt-20 border-t border-border/40">
        <div className="md:col-span-3">
          <FadeIn delay={0.2}>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono italic">Capabilities / Skills</span>
          </FadeIn>
        </div>
        <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, i) => (
            <FadeIn key={skill} delay={0.2 + (i * 0.05)}>
              <div className="space-y-4">
                <div className="h-[1px] w-full bg-border" />
                <span className="text-[11px] uppercase tracking-widest text-muted">{skill}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="pt-20 border-t border-border">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono italic">Timeline / Resume</span>
              <h2 className="text-[32px] md:text-[42px] font-bold tracking-tighter uppercase">Work Experience</h2>
            </div>
          </div>

          <div className="border-t border-border/40">
            {experience.map((item, idx) => (
              <motion.div 
                key={`${item.company}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-border/20 items-start group hover:bg-foreground/[0.01] px-4 -mx-4 transition-colors"
              >
                <div className="md:col-span-3 text-[12px] font-mono text-muted uppercase group-hover:text-foreground transition-colors">
                  {item.date}
                </div>
                <div className="md:col-span-4 flex flex-col gap-1">
                  <h3 className="text-[18px] font-bold tracking-tight leading-none group-hover:italic transition-all">
                    {item.role}
                  </h3>
                  <span className="text-[12px] opacity-40 uppercase tracking-widest">{item.company}</span>
                </div>
                <div className="md:col-span-5 text-[13px] md:text-right text-muted font-mono uppercase tracking-widest pt-1">
                  {item.location}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-32 pt-20 border-t border-border/40">
        <FadeIn>
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono italic">Languages / Idiomas</span>
              <div className="space-y-4">
                {languages.map(l => (
                  <div key={l.lang} className="flex justify-between items-center border-b border-border/20 pb-4">
                    <span className="text-[14px] font-bold uppercase">{l.lang}</span>
                    <span className="text-[11px] font-mono opacity-40">[{l.level}]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono italic">Recognition / Awards</span>
            <div className="p-8 border border-border group hover:border-foreground transition-colors duration-500 cursor-default">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-[18px] font-bold uppercase tracking-tighter">Created Awards</h3>
                <span className="text-[12px] font-mono opacity-40">2022</span>
              </div>
              <p className="text-[14px] leading-tight">
                Diseñador Pixel Art 2022<br />
                <span className="text-muted italic">(Community Distinction)</span>
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mt-40 -mx-8 md:-mx-12 px-8 md:px-12 py-32 bg-foreground text-background overflow-hidden">
        <FadeIn>
          <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase break-words">
            Let&apos;s build<br />
            <span className="opacity-40 italic">the next vision.</span>
          </h2>
          <div className="mt-16 flex flex-wrap gap-4 md:gap-8">
            <a href="https://www.behance.net/jerecorea" target="_blank" rel="noopener noreferrer" className="billboard-btn text-[10px] md:text-[12px] uppercase tracking-widest">Behance</a>
            <a href="https://www.instagram.com/rcrs.dev?igsh=MXYxa3NkMTdzNmRxZg==" target="_blank" rel="noopener noreferrer" className="billboard-btn text-[10px] md:text-[12px] uppercase tracking-widest">Instagram</a>
            <a href="https://x.com/jerecorea" target="_blank" rel="noopener noreferrer" className="billboard-btn text-[10px] md:text-[12px] uppercase tracking-widest">Twitter / X</a>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
