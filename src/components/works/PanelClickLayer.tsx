import { useEffect, useRef } from 'react'
import type { WorkProject } from './projectsData'
import type { PanelOpenEvent, PanelScreenRect } from './ProjectPanel'

interface PanelClickLayerProps {
  projects: WorkProject[]
  rects: PanelScreenRect[]
  onOpen?: (project: WorkProject, point: PanelOpenEvent) => void
}

export default function PanelClickLayer({
  projects,
  rects,
  onOpen,
}: PanelClickLayerProps) {
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      rects.forEach((rc, i) => {
        const btn = btnRefs.current[i]
        if (!btn) return
        if (rc.visible && rc.w > 4 && rc.h > 4) {
          btn.style.display = 'block'
          btn.style.left = `${rc.x}px`
          btn.style.top = `${rc.y}px`
          btn.style.width = `${rc.w}px`
          btn.style.height = `${rc.h}px`
        } else {
          btn.style.display = 'none'
        }
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [rects])

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="false">
      {projects.map((project, i) => (
        <button
          key={project.id}
          ref={(el) => {
            btnRefs.current[i] = el
          }}
          type="button"
          aria-label={`Open ${project.title}`}
          className="pointer-events-auto absolute z-10 cursor-pointer"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            padding: 0,
          }}
          onClick={(e) => onOpen?.(project, { x: e.clientX, y: e.clientY })}
        />
      ))}
    </div>
  )
}