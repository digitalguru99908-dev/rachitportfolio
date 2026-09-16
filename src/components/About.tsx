import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { SOCIALS } from '../data'

const EASE = [0.16, 1, 0.3, 1] as const

const STAT_CHIPS = [
  'AI Tools: 25+',
  'Focus: Digital Marketing + AI',
  'Building: VoiceMemories AI',
]

const JOURNEY = [
  {
    year: '2025',
    text: 'Discovered AI and started exploring it seriously.',
  },
  {
    year: '2025',
    text: 'Wanted to start Digital Marketing with AI, but 12th CBSE boards and some family circumstances meant it had to wait.',
  },
  {
    year: '2026',
    text: 'Finished 12th. Chose to follow my own interest instead of the path others wanted for me, and completed the Digital Marketing with AI course.',
  },
  {
    year: '2026',
    text: 'Started working on real projects (GitHub/LinkedIn) and began building my own AI product, VoiceMemories AI.',
  },
]

export default function About() {
  return (
    <section id="about" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="About"
          segments={[{ text: 'Who is ' }, { text: 'Rachit', italic: true }, { text: '?' }]}
          subtext="A bit about me, what I do, and why I do it."
        />

        <div className="flex flex-col gap-16 md:gap-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className="text-sm leading-relaxed text-muted md:text-base"
              >
                I got interested in AI in 2025, and that's when I started exploring
                it seriously.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="mt-4 text-sm leading-relaxed text-muted md:text-base"
              >
                I wanted to do a "Digital Marketing with AI" course early on, but I
                couldn't start right away — I had my 12th CBSE boards going on, and
                some family situations made it hard to begin. After I finished 12th,
                my family wanted me to take a different course. But I decided to follow
                what I was actually interested in, so I went ahead and completed the
                Digital Marketing with AI course anyway.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                className="mt-4 text-sm leading-relaxed text-muted md:text-base"
              >
                Now I'm working on real projects — you can check them out on my{' '}
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-primary underline decoration-stroke underline-offset-4 transition-colors duration-300 hover:decoration-text-primary"
                >
                  GitHub
                </a>{' '}
                and{' '}
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-primary underline decoration-stroke underline-offset-4 transition-colors duration-300 hover:decoration-text-primary"
                >
                  LinkedIn
                </a>
                .
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                className="mt-4 text-sm leading-relaxed text-muted md:text-base"
              >
                I currently know how to use 25+ AI tools. The ones I use the most
                are OpenCode (a coding agent), OpenAI's GPT, ElevenLabs, Cartesia AI,
                and Claude.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
                className="mt-4 text-sm leading-relaxed text-muted md:text-base"
              >
                I'm also starting to build my own AI products. One of them is called{' '}
                <strong className="text-text-primary">VoiceMemories AI</strong> — the
                idea is that someone can clone a loved one's voice (if they have a
                voice sample) and have a real, emotionally supportive conversation
                with that voice — even live calls, not just text. It's meant for
                people who've lost someone and want a way to feel close to them again.
                The project isn't finished yet — I've paused it for now because of
                funding — but it's something I really care about and plan to come back
                to.
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-2">
                {STAT_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-stroke bg-surface/50 px-4 py-2 text-xs text-muted"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-xs text-muted transition-colors duration-300 hover:border-text-primary hover:text-text-primary"
                >
                  GitHub ↗
                </a>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-xs text-muted transition-colors duration-300 hover:border-text-primary hover:text-text-primary"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="rounded-3xl border border-stroke bg-surface/30 p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  My Story
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  I'm not from a big city or a coding background — I'm a self-taught
                  builder who chose to follow what actually interests me, even when
                  the easier path was right there. I got into AI in 2025, and once I
                  started, I didn't stop. Today I work with 25+ AI tools, I'm doing
                  Digital Marketing with AI, and I'm building my own AI products on
                  the side.
                </p>
              </div>

              <div>
                <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
                  My Journey
                </p>
                <div className="relative flex flex-col gap-8 pl-6">
                  <div className="absolute left-[5px] top-2 bottom-2 w-px bg-stroke" />
                  {JOURNEY.map((item) => (
                    <motion.div
                      key={item.year + item.text.slice(0, 20)}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="relative"
                    >
                      <span className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full border border-stroke bg-bg" />
                      <span className="text-[11px] uppercase tracking-[0.2em] text-text-primary">
                        {item.year}
                      </span>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}