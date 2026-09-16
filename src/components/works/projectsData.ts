export interface WorkProject {
  id: string
  title: string
  tag: string
  accentFrom: string
  accentTo: string
  slug: string
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'fitness',
    title: 'Fitness Website',
    tag: 'Web · Fitness',
    accentFrom: '#4E85BF',
    accentTo: '#89AACC',
    slug: 'fitness-website',
  },
  {
    id: 'neon-racer',
    title: 'Neon Car Racing',
    tag: 'Web · Game',
    accentFrom: '#D946EF',
    accentTo: '#8B2FC9',
    slug: 'neon-car-racing',
  },
  {
    id: 'upcoming-game',
    title: 'Upcoming Game',
    tag: 'Coming Soon',
    accentFrom: '#3A3F4B',
    accentTo: '#5C6370',
    slug: 'upcoming-game',
  },
  {
    id: 'video-reel',
    title: 'Video Edit Reel',
    tag: 'Creative · Editing',
    accentFrom: '#4E85BF',
    accentTo: '#2F6FA3',
    slug: 'video-edit-reel',
  },
]