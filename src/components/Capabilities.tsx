import { motion } from 'framer-motion'
import {
  Bot,
  MessageCircle,
  Volume2,
  Waves,
  Sparkles,
  BrainCircuit,
  BarChart3,
  Megaphone,
  Zap,

  GraduationCap,
} from 'lucide-react'
import RevealHeading from './RevealHeading'

const EASE = [0.16, 1, 0.3, 1] as const

const TOOLS = [
  { icon: Bot, label: 'OpenCode', sub: 'Coding Agent' },
  { icon: MessageCircle, label: 'OpenAI GPT', sub: 'AI Assistant' },
  { icon: Volume2, label: 'ElevenLabs', sub: 'Voice AI' },
  { icon: Waves, label: 'Cartesia AI', sub: 'Voice Engine' },
  { icon: Sparkles, label: 'Claude', sub: 'Anthropic AI' },
]

const SKILLS = [
  { icon: BrainCircuit, label: '25+ AI Tools' },
  { icon: BarChart3, label: 'Digital Marketing' },
  { icon: Megaphone, label: 'AI-Powered Campaigns' },
  { icon: Zap, label: 'Real Projects, Real Impact' },
  { icon: GraduationCap, label: 'Learning Every Day' },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <RevealHeading
          as="h2"
          segments={[{ text: 'My ' }, { text: 'Capabilities', italic: true }]}
          className="mb-14 font-display text-5xl leading-[1.05] tracking-tight text-text-primary italic md:mb-20 md:text-6xl lg:text-7xl"
          delay={0.1}
        />

        <div className="space-y-12">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
              Tools I use
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {TOOLS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-stroke bg-surface/30 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-text-primary/50 hover:bg-surface/60"
                >
                  <item.icon
                    size={24}
                    strokeWidth={1.4}
                    className="transition-colors duration-500 group-hover:text-text-primary"
                  />
                  <div>
                    <span className="block text-sm text-text-primary">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted">
                      {item.sub}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
              What I bring
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {SKILLS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-stroke bg-surface/30 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-text-primary/50 hover:bg-surface/60"
                >
                  <item.icon
                    size={24}
                    strokeWidth={1.4}
                    className="transition-colors duration-500 group-hover:text-text-primary"
                  />
                  <span className="text-sm text-text-primary">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}