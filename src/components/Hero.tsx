import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import BackgroundVideo from './BackgroundVideo'
import Magnetic from './Magnetic'
import { HERO_ROLES, VIDEO_SRC } from '../data'
import { scrollToSection } from '../lib/lenis'

interface HeroProps {
  ready?: boolean
}

export default function Hero({ ready = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ready) {
        gsap.set('.name-reveal', { opacity: 0, y: 50 })
        gsap.set('.blur-in', { opacity: 0, y: 20, filter: 'blur(10px)' })
        return
      }
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.1,
      ).fromTo(
        '.blur-in',
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1 },
        0.3,
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [ready])

  useEffect(() => {
    const interval = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % HERO_ROLES.length),
      2000,
    )
    return () => window.clearInterval(interval)
  }, [])

  const scrollToWork = () => scrollToSection('work')
  const scrollToContact = () => scrollToSection('contact')

  return (
    <section
      id="home"
      ref={sectionRef}
      className="glow-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <BackgroundVideo
        src={VIDEO_SRC}
        overlay="bg-black/20"
        fallback="radial-gradient(1200px 800px at 20% 30%, #1b2c3d 0%, #0e1620 50%, #06080b 100%)"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          Class of '26
        </p>

        <h1 className="name-reveal mb-6 font-display text-6xl leading-[0.9] tracking-tight text-text-primary italic md:text-8xl lg:text-9xl">
          Rachit Sharma
        </h1>

        <p className="mb-8 max-w-md text-sm text-muted md:text-base">
          A{' '}
          <span
            key={roleIndex}
            className="animate-role-fade-in inline-block font-display text-base text-text-primary italic md:text-lg"
          >
            {HERO_ROLES[roleIndex]}
          </span>{' '}
          learning to grow brands.
        </p>

        <p className="mb-12 max-w-md text-sm text-muted md:text-base">
          Blending digital marketing strategy with AI tools to build brands,
          campaigns, and creative projects that actually connect.
        </p>

        <div className="inline-flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={0.35}>
            <button
              type="button"
              onClick={scrollToWork}
              className="border-gradient-ring rounded-full bg-text-primary px-7 py-3.5 text-sm font-medium text-bg transition-all duration-500 hover:scale-105 hover:bg-bg hover:text-text-primary"
            >
              See Work
            </button>
          </Magnetic>

          <button
            type="button"
            onClick={scrollToContact}
            className="border-gradient-ring rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition-all duration-500 hover:scale-105"
          >
            Reach out...
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.35em] text-muted">
          Scroll
        </span>
        <div className="overflow-hidden pt-0">
          <div className="animate-scroll-down h-10 w-px bg-stroke" />
        </div>
      </div>
    </section>
  )
}