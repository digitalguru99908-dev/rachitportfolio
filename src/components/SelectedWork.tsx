import { useState } from 'react'
import type { Project } from '../data'
import { PROJECTS, SOCIALS } from '../data'
import SectionHeader from './SectionHeader'
import TiltCard from './TiltCard'

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #16222a 0%, #3a6073 100%)',
  'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)',
]

export default function SelectedWork() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          segments={[{ text: 'Featured ' }, { text: 'projects', italic: true }]}
          subtext="A few things I've built and shipped."
          action={
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-stroke px-6 py-3 text-sm text-muted transition-all duration-500 hover:scale-105 hover:border-transparent hover:text-text-primary md:inline-flex border-gradient-ring"
            >
              View all work ↗
            </a>
          }
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {PROJECTS.map((project: Project, index) => (
            <TiltCard
              key={project.title}
              className={`group relative min-h-[320px] overflow-hidden rounded-3xl border border-stroke bg-surface ${project.span} ${project.aspect}`}
            >
              <ProjectMedia project={project} index={index} />

              <div className="pointer-events-none absolute inset-0 bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] ${
                    project.comingSoon
                      ? 'border border-stroke text-muted'
                      : 'bg-text-primary text-bg'
                  }`}
                >
                  {project.comingSoon ? 'Coming soon' : project.tag}
                </span>
              </div>

              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 z-10 flex items-end p-6"
                  aria-label={`View ${project.title}`}
                >
                  <span className="pointer-events-none translate-y-3 rounded-full border border-transparent bg-white px-5 py-2.5 text-sm text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 border-gradient-ring bg-white">
                    View —{' '}
                    <span className="font-display italic">
                      {project.title}
                    </span>
                  </span>
                </a>
              ) : (
                <div className="absolute inset-0 z-10 flex items-end p-6">
                  <span className="pointer-events-none translate-y-3 rounded-full border border-stroke bg-surface px-5 py-2.5 text-sm text-text-primary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Coming <span className="font-display italic">soon</span>
                  </span>
                </div>
              )}
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectMedia({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const [failed, setFailed] = useState(false)
  const fallback =
    PLACEHOLDER_GRADIENTS[
      index % PLACEHOLDER_GRADIENTS.length
    ]

  const showImage = Boolean(project.image) && !failed

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            fallback ??
            'linear-gradient(135deg, #101014 0%, #1b222b 100%)',
        }}
      />
      {showImage ? (
        <img
          src={project.image}
          alt={project.title}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          loading="lazy"
        />
      ) : null}
      <div
        className="halftone absolute inset-0 opacity-20 mix-blend-multiply"
        aria-hidden="true"
      />
    </>
  )
}