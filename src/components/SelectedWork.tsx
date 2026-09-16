import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data'
import { PROJECTS, SOCIALS } from '../data'
import WorksScene from './works/WorksScene'
import WorksOverlay from './works/WorksOverlay'
import ProjectDetailTransition from './works/ProjectDetailTransition'
import { useProjectTransition } from './works/useProjectTransition'
import { PANEL_COUNT } from './works/WorksScene'
import type { PanelOpenEvent } from './works/ProjectPanel'
import type { WorkProject } from './works/projectsData'
import { WORK_PROJECTS } from './works/projectsData'

function toProject(work: WorkProject): Project | undefined {
  const base = PROJECTS.find((p) => p.title === work.title)
  if (base) return base
  return { title: work.title, tag: work.tag, href: work.repoUrl, comingSoon: true, accent: work.accentTo, tagline: '', description: '', tech: [], aspect: '', span: '' }
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const blurRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [focusIndex, setFocusIndex] = useState(0)
  const { request, open, close } = useProjectTransition()

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) return
      const p = Math.max(
        0,
        Math.min(1, -el.getBoundingClientRect().top / total),
      )
      progressRef.current = p
      const idx = Math.min(
        PANEL_COUNT - 1,
        Math.round(p * (PANEL_COUNT - 1)),
      )
      setFocusIndex(idx)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const onOpen = (work: WorkProject, point: PanelOpenEvent) => {
    const project = toProject(work)
    if (!project) return
    const size = Math.min(window.innerWidth, window.innerHeight) * (project.comingSoon ? 0.09 : 0.28)
    const rect = new DOMRect(point.x - size / 2, point.y - size / 2, size, size)
    open(project, rect)
  }

  return (
    <section id="work" className="relative h-[400vh] bg-bg" ref={sectionRef}>
      <div className="sticky top-0 h-screen overflow-hidden bg-bg">
        <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex items-start justify-between px-6 sm:px-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Selected Work
            </span>
            <span className="hidden h-px w-8 bg-white/20 sm:block" />
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-white/30 sm:block">
              04 Projects
            </span>
          </div>
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto rounded-full border border-white/15 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:text-white"
          >
            View all work ↗
          </a>
        </div>

        <div ref={blurRef} className="absolute inset-0">
          <WorksScene
            progressRef={progressRef}
            blurEl={blurRef}
            onOpen={onOpen}
            projects={WORK_PROJECTS}
            focusIndex={focusIndex}
          />
        </div>

        <WorksOverlay progressRef={progressRef} projects={WORK_PROJECTS} />
      </div>

      {request && (
        <ProjectDetailTransition
          key={request.seq}
          project={request.project}
          originRect={request.originRect}
          onClose={close}
        />
      )}
    </section>
  )
}