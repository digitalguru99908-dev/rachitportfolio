import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { WorkProject } from './projectsData'

export interface PanelOpenEvent {
  x: number
  y: number
}

interface ProjectPanelProps {
  project: WorkProject
  z: number
  focusRange?: number
  onOpen?: (project: WorkProject, point: PanelOpenEvent) => void
}

const PANEL_W = 5
const PANEL_H = 3.1
const PANEL_D = 0.12

function useGradientTexture(from: string, to: string) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 320
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 512, 320)
      grad.addColorStop(0, from)
      grad.addColorStop(1, to)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 512, 320)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [from, to])
}

export default function ProjectPanel({
  project,
  z,
  focusRange = 6,
  onOpen,
}: ProjectPanelProps) {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const texture = useGradientTexture(project.accentFrom, project.accentTo)

  useFrame(({ camera }) => {
    const dist = Math.abs(camera.position.z - z)
    const focus = THREE.MathUtils.clamp(1 - dist / focusRange, 0, 1)
    const ease = focus * focus * (3 - 2 * focus)
    if (group.current) {
      group.current.scale.setScalar(0.86 + ease * 0.24)
      group.current.position.z = z
    }
    if (mat.current) {
      mat.current.opacity = 0.35 + ease * 0.65
    }
  })

  const onPanelClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onOpen?.(project, {
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    })
  }

  return (
    <group ref={group} position={[0, 0.15, z]}>
      <mesh onClick={onPanelClick} position={[0, 0, 0]}>
        <boxGeometry args={[PANEL_W, PANEL_H, PANEL_D]} />
        <meshBasicMaterial
          ref={mat}
          map={texture}
          transparent
          toneMapped={false}
        />
      </mesh>

      <Html
        position={[0, 0, PANEL_D / 2 + 0.01]}
        center
        transform
        distanceFactor={3.4}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="flex h-full w-full flex-col justify-between"
          style={{ width: '540px', height: '335px' }}
        >
          <div
            className="w-fit rounded-full border border-white/25 bg-black/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {project.tag}
          </div>

          <div>
            <h3
              className="text-5xl leading-none tracking-tight text-white"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              {project.title}
            </h3>
            <p
              className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              View project →
            </p>
          </div>
        </div>
      </Html>
    </group>
  )
}