import { useRef } from 'react'
import gsap from 'gsap'
import type { MutableRefObject } from 'react'
import type { Project } from '../../data'

interface ProjectDetailCardProps {
  project: Project
  accent: string
  onClose: () => void
  cardRef: MutableRefObject<HTMLDivElement | null>
}

export default function ProjectDetailCard({
  project,
  accent,
  onClose,
  cardRef,
}: ProjectDetailCardProps) {
  const shakeRef = useRef<HTMLButtonElement>(null)

  const shake = () => {
    if (!shakeRef.current) return
    gsap.fromTo(
      shakeRef.current,
      { x: 0 },
      { x: -10, duration: 0.08, repeat: 5, yoyo: true, ease: 'power1.inOut' },
    )
  }

  return (
    <div
      ref={cardRef}
      className="pointer-events-auto absolute inset-0 flex items-center justify-center p-6 opacity-0"
    >
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-stroke bg-surface/95 p-8 text-center shadow-2xl backdrop-blur-xl md:p-10">
        <p
          className="mb-3 text-[11px] uppercase tracking-[0.25em]"
          style={{ color: accent }}
        >
          {project.comingSoon ? 'Coming soon' : project.tag}
        </p>
        <h3 className="font-display text-4xl leading-none tracking-tight text-text-primary italic md:text-5xl">
          {project.title}
        </h3>
        <p className="mt-4 text-sm text-muted">{project.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {project.comingSoon ? (
            <button
              ref={shakeRef}
              type="button"
              onClick={shake}
              className="cursor-pointer rounded-full border border-stroke px-6 py-3 text-sm text-text-primary transition-transform duration-200 hover:scale-105"
            >
              Keep me posted <span className="inline-block">→</span>
            </button>
          ) : project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-105"
            >
              View Details <span className="inline-block">↗</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-stroke px-6 py-3 text-sm text-muted">
              Details coming soon
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-full border border-stroke px-5 py-3 text-sm text-muted transition-colors duration-300 hover:text-text-primary"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}