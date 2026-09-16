import type Lenis from 'lenis'

let current: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  current = lenis
}

export function scrollToSection(targetId: string) {
  const el = document.getElementById(targetId)
  if (!el) return
  if (current) {
    current.scrollTo(el, { offset: 0, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function scrollToTop() {
  if (current) {
    current.scrollTo(0, { duration: 1 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}