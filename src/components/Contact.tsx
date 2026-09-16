import BackgroundVideo from './BackgroundVideo'
import Footer from './Footer'
import Magnetic from './Magnetic'
import RevealHeading from './RevealHeading'
import Marquee from './Marquee'
import { PERSONAL, VIDEO_SRC } from '../data'

export default function Contact() {
  return (
    <section
      id="contact"
      className="glow-section relative flex flex-col overflow-hidden pt-16 md:pt-20 pb-8 md:pb-12"
      style={{ minHeight: '100vh' }}
    >
      <BackgroundVideo src={VIDEO_SRC} flip overlay="bg-black/60" />

      <div className="relative z-10 flex flex-1 flex-col">
        <Marquee />

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Contact
            </span>
            <span className="h-px w-8 bg-stroke" />
          </div>

          <RevealHeading
            as="h2"
            segments={[
              { text: "Let's " },
              { text: 'grow', italic: true },
              { text: ' something ' },
              { text: 'together', italic: true },
            ]}
            className="mb-10 font-display text-5xl leading-[1.05] tracking-tight text-text-primary italic md:text-6xl lg:text-7xl"
            delay={0.1}
          />

          <Magnetic strength={0.35}>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="border-gradient-ring inline-flex items-center gap-3 rounded-full bg-text-primary px-8 py-4 text-sm font-medium text-bg transition-all duration-500 hover:scale-105 hover:bg-bg hover:text-text-primary md:text-base"
            >
              {PERSONAL.email}
              <span className="inline-block">↗</span>
            </a>
          </Magnetic>

          <p className="mt-6 text-sm text-muted">
            or call me on{' '}
            <a
              href={PERSONAL.phoneHref}
              className="text-text-primary underline decoration-stroke underline-offset-4 transition-colors duration-300 hover:decoration-text-primary"
            >
              {PERSONAL.phone}
            </a>
          </p>
        </div>

        <Footer />
      </div>
    </section>
  )
}