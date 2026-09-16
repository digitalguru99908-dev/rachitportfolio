import { motion } from 'framer-motion'
import { STATS } from '../data'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Stats() {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 border-y border-stroke py-14 sm:grid-cols-3 sm:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
              className="flex flex-col items-start gap-3 sm:items-center sm:text-center"
            >
              <span className="font-display text-6xl italic tracking-tight text-text-primary md:text-7xl lg:text-8xl">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}