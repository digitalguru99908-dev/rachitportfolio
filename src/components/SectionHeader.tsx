import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import RevealHeading from './RevealHeading'

interface SectionHeaderProps {
  eyebrow: string
  segments: { text: string; italic?: boolean }[]
  subtext: string
  action?: ReactNode
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function SectionHeader({
  eyebrow,
  segments,
  subtext,
  action,
}: SectionHeaderProps) {
  return (
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
            {eyebrow}
          </span>
        </div>
        <RevealHeading
          as="h2"
          segments={segments}
          className="font-display text-5xl leading-[1.05] tracking-tight text-text-primary italic md:text-6xl lg:text-7xl"
          delay={0.1}
        />
        <p className="mt-4 text-sm text-muted md:text-base">{subtext}</p>
      </div>
      {action}
    </motion.div>
  )
}