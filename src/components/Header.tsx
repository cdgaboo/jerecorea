"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [time, setTime] = useState("")
  const pathname = usePathname()


  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        // timeZone: 'America/Managua'
      })
      setTime(formatted)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      

      setIsScrolled(currentScrollY > 20)


      if (currentScrollY > 100 && currentScrollY > lastScrollY && !isMenuOpen) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isMenuOpen])

  const navLinks = [
    { name: "Work", href: "/" },
    { name: "About", href: "/about" },
  ]

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-[0.16, 1, 0.3, 1] 
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/40 py-4' : 'bg-transparent py-8'}
        px-8 md:px-12`}
      >
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">

          <Link 
            href="/" 
            className="text-[14px] font-medium tracking-[-0.03em] flex items-center gap-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.span 
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity"
            >
              ✦
            </motion.span>
            <span className="group-hover:tracking-[0.02em] transition-all duration-300">jerecorea</span>
          </Link>
          

          <div className="hidden md:flex items-center gap-16">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className={`text-[12px] uppercase tracking-[0.15em] transition-all duration-300 hover:text-foreground relative group
                      ${isActive ? 'text-foreground font-medium' : 'text-muted hover:text-foreground'}
                    `}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 w-full h-[1px] bg-foreground"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="h-4 w-[1px] bg-border/60 mx-2" />

            <div className="flex items-center gap-6 text-[10px] text-muted font-mono uppercase tracking-[0.1em]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <span>San José, C.R.</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
          

          <button 
            className="md:hidden group relative w-8 h-8 flex flex-col items-end justify-center gap-1.5"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-full h-[1px] bg-foreground transition-all duration-300 group-hover:w-1/2" />
            <span className="w-3/4 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </header>


      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-background flex flex-col px-8 py-8"
          >
            <div className="flex justify-between items-center">
              <Link href="/" className="text-[14px] font-medium tracking-tight" onClick={() => setIsMenuOpen(false)}>
                jerecorea™
              </Link>
              <button 
                className="w-10 h-10 flex items-center justify-center relative group"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="absolute w-6 h-[1px] bg-foreground rotate-45 transition-transform group-hover:rotate-[135deg]" />
                <span className="absolute w-6 h-[1px] bg-foreground -rotate-45 transition-transform group-hover:-rotate-[135deg]" />
              </button>
            </div>

            <div className="mt-24 flex flex-col">

              <nav className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-[42px] leading-tight tracking-[-0.04em] hover:italic transition-all inline-block group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-4 text-[13px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="mt-auto pt-12 border-t border-border/40 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted mb-4 font-medium">Connect</h4>
                  <div className="flex flex-col gap-2 text-[13px]">
                    <a href="https://www.behance.net/jerecorea" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">Behance</a>
                    <a href="https://www.instagram.com/rcrs.dev?igsh=MXYxa3NkMTdzNmRxZg==" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">Instagram</a>
                    <a href="https://x.com/jerecorea" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">X (Twitter)</a>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted mb-4 font-medium">Contact</h4>
                  <a href="mailto:jgalcorea@gmail.com" className="text-[13px] hover:opacity-50 transition-opacity whitespace-nowrap">jgalcorea@gmail.com</a>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-muted font-medium">Local Time</span>
                  <span className="text-[13px] font-mono">{time} — NI</span>
                </div>
                <div className="flex items-center gap-6">
                  <ThemeToggle />
                  <span className="text-[10px] opacity-20 uppercase font-mono tracking-tighter italic whitespace-nowrap">© 2026 JEREMIAS COREA</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
