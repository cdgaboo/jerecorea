export default function Footer() {
  const socials = [
    { name: "Behance", href: "https://www.behance.net/jerecorea" },
    { name: "Instagram", href: "https://www.instagram.com/rcrs.dev?igsh=MXYxa3NkMTdzNmRxZg==" },
    { name: "X (Twitter)", href: "https://x.com/jerecorea" },
  ]

  return (
    <footer className="border-t border-border/40 mt-32">
      <div className="px-8 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          <div className="col-span-12 md:col-span-4 space-y-2">
            <p className="text-[14px] font-bold tracking-tighter uppercase italic">jerecorea</p>
            <div className="text-[10px] font-mono text-muted uppercase tracking-widest flex flex-col gap-0.5">
              <span>Archive 2016 – 2026</span>
              <span>All rights reserved</span>
            </div>
          </div>
          

          <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4">
            {socials.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-muted hover:text-foreground transition-colors uppercase tracking-[0.1em] border-b border-transparent hover:border-foreground w-fit h-fit"
              >
                {link.name}
              </a>
            ))}
          </div>
          

          <div className="col-span-12 md:col-span-4 md:text-right flex flex-col md:items-end justify-between gap-8">
            <a
              href="mailto:jgalcorea@gmail.com"
              className="text-[12px] font-bold uppercase tracking-widest border border-foreground/10 hover:border-foreground px-10 py-5 transition-all duration-700 w-fit"
            >
              Get in Touch
            </a>
            <span className="text-[10px] font-mono opacity-20 uppercase tracking-[0.3em]">Built with Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
