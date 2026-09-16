export const PERSONAL = {
  name: 'Rachit Sharma',
  email: 'rachitsharma999088@gmail.com',
  phone: '+91 83071 51186',
  phoneHref: 'tel:+918307151186',
}

export const SOCIALS = {
  github: 'https://github.com/digitalguru99908-dev',
  linkedin: 'https://www.linkedin.com/in/rachit-sharma', // TODO: link your real LinkedIn profile
  instagram: 'https://www.instagram.com/rachitsharma', // TODO: link your real Instagram profile
}

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: SOCIALS.linkedin },
  { label: 'GitHub', href: SOCIALS.github },
  { label: 'Instagram', href: SOCIALS.instagram },
]

export const VIDEO_SRC =
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
// TODO: replace with a real HLS/mp4 link you own, or a static gradient background.

export const HERO_ROLES = [
  'Digital Marketer',
  'AI-Powered Creator',
  'Fast Learner',
  'Problem Solver',
]

export const LOADING_WORDS = ['Grow', 'Market', 'Convert']

export const NAV_LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'Work', target: 'work' },
  { label: 'Resume', target: 'resume', route: '/resume' },
]

export interface Project {
  title: string
  tag: string
  href?: string
  image?: string
  aspect: string
  span: string
  comingSoon?: boolean
}

export const PROJECTS: Project[] = [
  {
    title: 'Fitness Website',
    tag: 'Web · Fitness',
    href: 'https://github.com/digitalguru99908-dev/Fitness-website',
    image:
      'https://socialify.git.ci/digitalguru99908-dev/Fitness-website/png?theme=Dark&font=Rokkitt&pattern=Circuit%20Board',
    aspect: 'aspect-[4/3] md:aspect-auto',
    span: 'md:col-span-7',
  },
  {
    title: 'Neon Car Racing',
    tag: 'Web · Game',
    href: 'https://github.com/digitalguru99908-dev/neon-car-racing-game-',
    image:
      'https://socialify.git.ci/digitalguru99908-dev/neon-car-racing-game-/png?theme=Dark&font=Rokkitt&pattern=Floating%20Cogs',
    aspect: 'aspect-[4/3] md:aspect-auto',
    span: 'md:col-span-5',
  },
  {
    title: 'Upcoming Game',
    tag: 'Work in progress',
    aspect: 'aspect-[4/3] md:aspect-auto',
    span: 'md:col-span-5',
    comingSoon: true,
  },
  {
    title: 'Video Edit Reel',
    tag: 'Creative · Editing',
    aspect: 'aspect-[4/3] md:aspect-auto',
    span: 'md:col-span-7',
    comingSoon: true,
  },
]

export interface JournalEntry {
  title: string
  tag: string
}

export const JOURNAL: JournalEntry[] = [
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

export interface Stat {
  value: string
  label: string
}

export const STATS: Stat[] = [
  { value: '1', label: 'Portfolio Site Built' },
  { value: '2+', label: 'Projects Shipped' },
  { value: '100%', label: 'Committed to Learning' },
]