import { useRef } from 'react'
import gsap from 'gsap'
import type { MutableRefObject } from 'react'
import type { Project } from '../../data'

const CIRCLE_EASE = 'cubic-bezier(.16,.84,.28,1)'

interface ProjectDetailCardProps {
  project: Project
  accent: string
  onClose: () => void
  cardRef: MutableRefObject<HTMLDivElement | null>
  panelRef: MutableRefObject<HTMLDivElement | null>
}

export default function ProjectDetailCard({
  project,
  accent,
  onClose,
  cardRef,
  panelRef,
}: ProjectDetailCardProps) {
  const shakeRef = useRef<HTMLButtonElement>(null)

  const openPanel = () => {
    if (!panelRef.current || !cardRef.current) return
    gsap.to(cardRef.current, {
      autoAlpha: 0,
      scale: 0.96,
      duration: 0.25,
      ease: 'power2.in',
    })
    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, scale: 0.96 },
      { autoAlpha: 1, scale: 1, duration: 0.45, ease: CIRCLE_EASE },
    )
  }

  const shake = () => {
    if (!shakeRef.current) return
    gsap.fromTo(
      shakeRef.current,
      { x: 0 },
      { x: -10, duration: 0.08, repeat: 5, yoyo: true, ease: 'power1.inOut' },
    )
  }

  return (
    <>
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
            ) : (
              <button
                type="button"
                onClick={openPanel}
                className="cursor-pointer rounded-full bg-text-primary px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-105"
              >
                View Details
              </button>
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

      {!project.comingSoon && (
        <div
          ref={panelRef}
          className="absolute inset-0 z-20 overflow-y-auto bg-bg opacity-0"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="fixed right-6 top-6 z-30 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-stroke bg-surface/80 text-lg text-text-primary backdrop-blur-md transition-colors duration-300 hover:text-text-primary"
          >
            ✕
          </button>

          <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-20 md:px-10 md:pt-28">
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 h-[45vh] opacity-30"
              style={{
                background: `radial-gradient(closest-side, ${accent}22, transparent 70%)`,
              }}
            />

            <p
              className="mb-3 text-xs uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              {project.tag}
            </p>
            <h2 className="font-display text-5xl leading-none tracking-tight text-text-primary italic md:text-7xl">
              {project.title}
            </h2>
            <p className="mt-5 max-w-xl text-sm text-muted md:text-base">
              {project.tagline}
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl border border-stroke bg-surface">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-64 w-full object-cover md:h-80"
                  loading="eager"
                />
              ) : (
                <div
                  className="h-64 w-full md:h-80"
                  style={{
                    background: `linear-gradient(135deg, ${accent}22 0%, ${accent}08 100%)`,
                  }}
                />
              )}
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr]">
              <div>
                <h4 className="mb-3 font-display text-2xl italic text-text-primary">
                  About this build
                </h4>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="mb-3 font-display text-2xl italic text-text-primary">
                  Built with
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-stroke bg-surface px-4 py-2 text-xs text-text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-105"
                  >
                    View on GitHub <span className="inline-block">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}