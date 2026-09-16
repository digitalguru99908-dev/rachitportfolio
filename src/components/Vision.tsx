import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const LINES = [
  { text: "I don't just run campaigns.", accent: false },
  { text: 'I build brands that connect.', accent: true },
  { text: "I don't just use AI tools.", accent: false },
  { text: 'I build my own.', accent: true },
  { text: "I'm not chasing a job title.", accent: false },
  { text: "I'm building things that matter.", accent: true },
]

export default function Vision() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 55%, hsl(217 70% 40% / 0.10), transparent)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-10 text-xs uppercase tracking-[0.3em] text-muted md:mb-14"
        >
          My Vision
        </motion.p>

        <div className="flex flex-col gap-5 md:gap-6">
          {LINES.map((line, i) => (
            <motion.p
              key={line.text}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
              className={
                line.accent
                  ? 'font-display text-3xl font-medium tracking-tight text-text-primary italic md:text-5xl lg:text-6xl'
                  : 'text-2xl font-medium tracking-tight text-muted md:text-4xl lg:text-5xl'
              }
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}