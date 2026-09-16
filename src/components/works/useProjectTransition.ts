import { useCallback, useRef, useState } from 'react'
import type { Project } from '../../data'

export interface ProjectTransitionRequest {
  project: Project
  originRect: DOMRect
  seq: number
}

export function useProjectTransition() {
  const [request, setRequest] = useState<ProjectTransitionRequest | null>(null)
  const seqRef = useRef(0)

  const open = useCallback((project: Project, originRect: DOMRect) => {
    seqRef.current += 1
    setRequest({ project, originRect, seq: seqRef.current })
  }, [])

  const close = useCallback(() => setRequest(null), [])

  return { request, open, close }
}