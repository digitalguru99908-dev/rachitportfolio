import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import RevealHeading from './RevealHeading'

interface JournalProps {
  action?: ReactNode
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function Journal({ action }: JournalProps) {
  const entries = [
    {
      title:
        'Learning how ChatGPT can turn one sharp brief into a full campaign sprint.',
      tag: 'AI · Prompting',
    },
    {
      title: "SEO isn't dead — it's just learning to speak AI to search engines.",
      tag: 'SEO',
    },
    {
      title:
        'Rebuilt the landing page twice. The third pass finally felt like a brand.',
      tag: 'Branding',
    },
    {
      title:
        'Content that converts starts with one strong hook, not a wall of text.',
      tag: 'Copywriting',
    },
  ]

  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-16 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Journal
              </span>
            </div>
            <RevealHeading
              as="h2"
              segments={[
                { text: 'Recent ' },
                { text: 'thoughts', italic: true },
              ]}
              className="font-display text-5xl leading-[1.05] tracking-tight text-text-primary italic md:text-6xl lg:text-7xl"
              delay={0.1}
            />
            <p className="mt-4 text-sm text-muted md:text-base">
              Notes from my digital marketing + AI course work.
            </p>
          </div>
          {action}
        </motion.div>

        <div className="flex flex-col gap-4">
          {entries.map((entry, i) => (
            <motion.article
              key={entry.tag + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              className="flex items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-500 hover:bg-surface sm:rounded-full"
            >
              <span className="hidden h-2 w-2 flex-shrink-0 rounded-full bg-muted/50 sm:block" />
              <p className="flex-1 text-sm text-text-primary md:text-base">
                {entry.title}
              </p>
              <span className="flex-shrink-0 whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-muted">
                {entry.tag}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}