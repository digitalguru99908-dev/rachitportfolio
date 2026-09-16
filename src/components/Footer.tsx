import type { ReactNode } from 'react'
import { SOCIAL_LINKS } from '../data'

export default function Footer() {
  const socialLinks: ReactNode = SOCIAL_LINKS.map((link) => (
    <a
      key={link.label}
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-muted transition-colors duration-300 hover:text-text-primary"
    >
      {link.label}
    </a>
  ))

  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-stroke/60 px-6 pt-10 pb-8 text-center md:flex-row md:text-left">
      <div className="flex items-center justify-center gap-6 md:justify-start">
        {socialLinks}
      </div>

      <div className="flex items-center gap-2.5 text-sm text-muted">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400/80" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Open to Digital Marketing opportunities
      </div>
    </footer>
  )
}