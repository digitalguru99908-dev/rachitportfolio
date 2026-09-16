import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import RevealHeading from '../components/RevealHeading'
import { PERSONAL } from '../data'

const EASE = [0.16, 1, 0.3, 1] as const

function Block({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Resume(): ReactNode {
  return (
    <main className="mx-auto min-h-screen max-w-[860px] bg-bg px-6 pb-16 pt-32 md:px-10 md:pt-40">
      <Block>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">
          Resume
        </p>
        <RevealHeading
          as="h1"
          segments={[
            { text: 'Rachit ' },
            { text: 'Sharma', italic: true },
          ]}
          className="font-display text-6xl leading-[0.95] tracking-tight text-text-primary italic md:text-7xl"
        />
        <p className="mt-6 text-sm text-muted md:text-base">
          Digital Marketing Specialist (in training) · Digital Marketing with AI
          course, in progress.
        </p>
        <a
          href={`mailto:${PERSONAL.email}`}
          className="mt-4 inline-block text-sm text-text-primary underline decoration-stroke underline-offset-4 transition-colors duration-300 hover:decoration-text-primary"
        >
          {PERSONAL.email}
        </a>
        <span className="mx-3 text-muted">·</span>
        <a
          href={PERSONAL.phoneHref}
          className="inline-block text-sm text-text-primary underline decoration-stroke underline-offset-4 transition-colors duration-300 hover:decoration-text-primary"
        >
          {PERSONAL.phone}
        </a>
      </Block>

      <div className="mt-16 flex flex-col gap-14 md:mt-20">
        <Block delay={0.1}>
          <h2 className="mb-5 font-display text-3xl italic tracking-tight text-text-primary md:text-4xl">
            Education
          </h2>
          <div className="border-l border-stroke pl-6">
            <div className="flex flex-col gap-1 pb-8">
              <p className="text-sm font-medium text-text-primary md:text-base">
                Digital Marketing with AI
              </p>
              <p className="text-sm text-muted">Currently completing · 2026</p>
            </div>
          </div>
        </Block>

        <Block delay={0.2}>
          <h2 className="mb-5 font-display text-3xl italic tracking-tight text-text-primary md:text-4xl">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {[
              'Social Media Marketing',
              'SEO & Content',
              'AI Prompting',
              'Copywriting',
              'Campaign Planning',
              'Canva',
              'Ad Design Basics',
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-stroke bg-surface px-4 py-2 text-sm text-text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </Block>

        <Block delay={0.3}>
          <h2 className="mb-5 font-display text-3xl italic tracking-tight text-text-primary md:text-4xl">
            Projects
          </h2>
          <div className="space-y-6 border-l border-stroke pl-6">
            {[
              {
                title: 'Fitness Website',
                desc: 'A fitness-focused website built to practice clean UI, responsive layout, and brand messaging.',
              },
              {
                title: 'Neon Car Racing Game',
                desc: 'A browser racing game built for fun and practice with JavaScript game loops.',
              },
            ].map((p) => (
              <div key={p.title}>
                <p className="text-sm font-medium text-text-primary md:text-base">
                  {p.title}
                </p>
                <p className="mt-1 max-w-xl text-sm text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </Block>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}